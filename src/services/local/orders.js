import { ORDER_STATUSES } from '../../utils/tracking';
import { getShipping } from '../../utils/shipping';
import { products } from './products';
import { read, write } from './storage';

const METHODS = ['pix', 'card', 'boleto'];
const MAX_QUANTITY = 10;

const round2 = (n) => Math.round(n * 100) / 100;
const createOrderId = () => `${String(Date.now()).slice(-8)}${Math.floor(10 + Math.random() * 90)}`;

function assertValid({ customer, address, payment, items }) {
  if (!items?.length) throw new Error('O pedido não tem itens.');

  if (!customer?.name || !customer?.email || !customer?.cpf || !customer?.phone) {
    throw new Error('Dados do cliente incompletos.');
  }

  const { cep, street, number, neighborhood, city, state } = address ?? {};
  if (!cep || !street || !number || !neighborhood || !city || !state) {
    throw new Error('Endereço de entrega incompleto.');
  }

  if (!METHODS.includes(payment?.method)) throw new Error('Forma de pagamento inválida.');

  const { installments } = payment;
  if (!Number.isInteger(installments) || installments < 1 || installments > 6) {
    throw new Error('Número de parcelas inválido.');
  }
}

export const orders = {
  // O cliente envia só produto, tamanho e quantidade. Preço, frete e total são calculados aqui,
  // nunca confiados ao navegador (o servidor real fará o mesmo).
  async create(input) {
    assertValid(input);

    const lines = [];
    for (const { productId, size, quantity } of input.items) {
      const product = await products.getById(productId);
      if (!product) throw new Error('Um dos produtos não está mais disponível.');
      if (!product.sizes.includes(size)) {
        throw new Error(`O tamanho ${size} não está disponível para ${product.title}.`);
      }
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
        throw new Error('Quantidade inválida.');
      }

      lines.push({
        key: `${product.id}-${size}`,
        id: product.id,
        title: product.title,
        brand: product.brand,
        image: product.image,
        price: product.price,
        size,
        quantity,
      });
    }

    const subtotal = round2(lines.reduce((sum, l) => sum + l.price * l.quantity, 0));
    const shipping = getShipping(subtotal);
    const now = Date.now();

    const order = {
      id: createOrderId(),
      createdAt: now,
      status: 'pending',
      history: [{ status: 'pending', at: now }],
      items: lines,
      subtotal,
      shipping,
      total: round2(subtotal + shipping),
      customer: input.customer,
      address: input.address,
      payment: input.payment,
    };

    write('orders', [order, ...read('orders', [])]);
    return order;
  },

  async getById(id) {
    return read('orders', []).find((o) => o.id === id) ?? null;
  },

  async list() {
    return [...read('orders', [])].sort((a, b) => b.createdAt - a.createdAt);
  },

  // Usado pelo painel do dono (próximo passo)
  async updateStatus(id, status) {
    if (!ORDER_STATUSES.includes(status)) throw new Error('Status inválido.');

    const all = read('orders', []);
    const order = all.find((o) => o.id === id);
    if (!order) throw new Error('Pedido não encontrado.');

    const updated = { ...order, status, history: [...order.history, { status, at: Date.now() }] };
    write('orders', all.map((o) => (o.id === id ? updated : o)));
    return updated;
  },
};