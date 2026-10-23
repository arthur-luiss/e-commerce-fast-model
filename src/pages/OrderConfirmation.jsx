import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import OrderTimeline from '../components/OrderTimeline';
import { useNow } from '../hooks/useNow';
import { formatBRL } from '../utils/format';
import { getOrder, updateOrder } from '../utils/orders';
import { getPaidAt, STEP_MS } from '../utils/tracking';

const DAY = 24 * 60 * 60 * 1000;

function OrderView({ id }) {
  const [order, setOrder] = useState(() => getOrder(id));
  const [copied, setCopied] = useState(false);
  const now = useNow();

  if (!order) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Pedido não encontrado</h1>
        <p className="mt-2 text-slate-500">Os pedidos ficam salvos apenas neste navegador.</p>
        <Link to="/pedidos" className="mt-6 inline-block font-semibold underline">
          Ver meus pedidos
        </Link>
      </div>
    );
  }

  const { payment, address, customer } = order;
  const paid = Boolean(getPaidAt(order));
  const firstName = customer.name.split(' ')[0];
  const dueDate = new Date(order.createdAt + 3 * DAY).toLocaleDateString('pt-BR');

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(payment.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // sem permissão para a área de transferência: o código continua visível na tela
    }
  };

  const simulatePayment = () => {
    updateOrder(order.id, { paidAt: Date.now() });
    setOrder(getOrder(order.id));
  };

  return (
    <div className="mx-auto max-w-3xl pb-20">
      <Link to="/pedidos" className="text-sm text-slate-500 hover:text-slate-900">
        ← Meus pedidos
      </Link>

      <div className="mt-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
          <Icon name="check" className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">Obrigado, {firstName}!</h1>
        <p className="mt-1 text-slate-500">
          Pedido <strong className="text-slate-900">#{order.id}</strong> registrado em{' '}
          {new Date(order.createdAt).toLocaleDateString('pt-BR')}.
        </p>
      </div>

      <section className="mt-10 rounded-xl border border-slate-200 p-6">
        <h2 className="mb-3 text-base font-bold">Pagamento</h2>

        {payment.method === 'card' && (
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-green-600">Pagamento aprovado.</span> Cartão final{' '}
            {payment.cardLast4} em {payment.installments}x de{' '}
            {formatBRL(order.total / payment.installments)} sem juros.
          </p>
        )}

        {payment.method !== 'card' && paid && (
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-green-600">Pagamento confirmado.</span> Seu pedido já
            está sendo preparado.
          </p>
        )}

        {payment.method !== 'card' && !paid && (
          <>
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-amber-600">Aguardando pagamento.</span>{' '}
              {payment.method === 'pix'
                ? 'Copie o código abaixo e pague pelo app do seu banco.'
                : `Use o código abaixo para pagar o boleto até ${dueDate}.`}
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <code className="flex-1 break-all rounded-lg bg-slate-50 p-3 text-xs">{payment.code}</code>
              <button
                onClick={copyCode}
                className="shrink-0 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold hover:border-slate-900"
              >
                {copied ? 'Copiado!' : 'Copiar código'}
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Código de demonstração: não funciona em aplicativos de banco.
            </p>
            <button
              onClick={simulatePayment}
              className="mt-4 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-slate-700"
            >
              Simular pagamento
            </button>
            <p className="mt-2 text-xs text-slate-400">
              Só para demonstração: confirma o pagamento e inicia o acompanhamento.
            </p>
          </>
        )}
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 p-6">
        <h2 className="mb-5 text-base font-bold">Acompanhamento</h2>
        <OrderTimeline order={order} now={now} />
        <p className="mt-5 text-xs text-slate-400">
          Simulação: cada etapa avança a cada {STEP_MS / 60000} minuto.
        </p>
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
        <p className="mt-4 text-xs text-slate-400">
          Pedido de demonstração: nenhum e-mail foi enviado e nenhuma cobrança foi feita.
        </p>
      </div>
    </div>
  );
}

export default function OrderConfirmation() {
  const { id } = useParams();
  return <OrderView key={id} id={id} />;
}