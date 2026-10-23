import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import OrderTimeline from '../components/OrderTimeline';
import { PageError, PageLoading } from '../components/PageState';
import { brand } from '../config/brand';
import { useAsync } from '../hooks/useAsync';
import { services } from '../services';
import { formatBRL } from '../utils/format';
import { getStatus } from '../utils/tracking';

const methodLabels = { pix: 'Pix', card: 'Cartão de crédito', boleto: 'Boleto' };

const badgeTones = {
  amber: 'bg-amber-100 text-amber-700',
  slate: 'bg-slate-100 text-slate-700',
  green: 'bg-green-100 text-green-700',
  red: 'bg-red-100 text-red-700',
};

function OrderView({ id }) {
  const { data: order, status, reload } = useAsync(() => services.orders.getById(id), [id]);

  if (order === undefined) return status === 'error' ? <PageError onRetry={reload} /> : <PageLoading />;

  if (order === null) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Pedido não encontrado</h1>
        <Link to="/pedidos" className="mt-6 inline-block font-semibold underline">
          Ver meus pedidos
        </Link>
      </div>
    );
  }

  const { payment, address, customer } = order;
  const current = getStatus(order);
  const firstName = customer.name.split(' ')[0];

  return (
    <div className="mx-auto max-w-3xl pb-20">
      <Link to="/pedidos" className="text-sm text-slate-500 hover:text-slate-900">
        ← Meus pedidos
      </Link>

      <div className="mt-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
          <Icon name="check" className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">Pedido #{order.id}</h1>
        <p className="mt-1 text-slate-500">
          Obrigado, {firstName}! Pedido feito em {new Date(order.createdAt).toLocaleDateString('pt-BR')}.
        </p>
      </div>

      <section className="mt-10 rounded-xl border border-slate-200 p-6">
        <h2 className="mb-3 text-base font-bold">Pagamento</h2>
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-slate-600">
            {methodLabels[payment.method]}
            {payment.method === 'card' && payment.installments > 1
              ? ` em ${payment.installments}x de ${formatBRL(order.total / payment.installments)} sem juros`
              : ''}
          </p>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeTones[current.tone]}`}>
            {current.label}
          </span>
        </div>
        {order.status === 'pending' && (
          <p className="mt-3 text-xs text-slate-500">
            Assim que o pagamento for confirmado, o status do pedido é atualizado aqui.
          </p>
        )}
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 p-6">
        <h2 className="mb-5 text-base font-bold">Acompanhamento</h2>
        <OrderTimeline order={order} />
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 p-6">
        <h2 className="mb-3 text-base font-bold">Entrega</h2>
        <address className="text-sm not-italic leading-relaxed text-slate-600">
          {address.street}, {address.number}
          {address.complement && ` - ${address.complement}`}
          <br />
          {address.neighborhood} - {address.city}/{address.state}
          <br />
          CEP {address.cep}
        </address>
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 p-6">
        <h2 className="mb-4 text-base font-bold">Itens do pedido</h2>

        <ul className="space-y-4">
          {order.items.map((item) => (
            <li key={item.key} className="flex gap-3">
              <div className="h-20 w-16 shrink-0 overflow-hidden bg-slate-100">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 text-sm">
                <p>{item.title}</p>
                <p className="text-xs text-slate-500">
                  Tam. {item.size} · Qtd. {item.quantity}
                </p>
              </div>
              <p className="text-sm font-semibold">{formatBRL(item.price * item.quantity)}</p>
            </li>
          ))}
        </ul>

        <div className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Subtotal</span>
            <span>{formatBRL(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Frete</span>
            <span>{order.shipping === 0 ? 'Grátis' : formatBRL(order.shipping)}</span>
          </div>
          <div className="flex justify-between pt-2 text-base font-bold">
            <span>Total</span>
            <span>{formatBRL(order.total)}</span>
          </div>
        </div>
      </section>

      <div className="mt-8 text-center">
        <Link
          to="/catalogo"
          className="inline-block rounded-full bg-slate-900 px-8 py-3 text-sm font-bold text-white hover:bg-slate-700"
        >
          Continuar comprando
        </Link>
        {brand.demo && (
          <p className="mt-4 text-xs text-slate-400">
            Pedido de demonstração: nenhum e-mail foi enviado e nenhuma cobrança foi feita.
          </p>
        )}
      </div>
    </div>
  );
}

export default function OrderConfirmation() {
  const { id } = useParams();
  return <OrderView key={id} id={id} />;
}