import { Link } from 'react-router-dom';
import { PageError, PageLoading } from '../components/PageState';
import { useAsync } from '../hooks/useAsync';
import { services } from '../services';
import { formatBRL } from '../utils/format';
import { getStatus } from '../utils/tracking';

const tones = {
  amber: 'bg-amber-100 text-amber-700',
  slate: 'bg-slate-100 text-slate-700',
  green: 'bg-green-100 text-green-700',
  red: 'bg-red-100 text-red-700',
};

const MAX_THUMBS = 4;

export default function Orders() {
  const { data: orders, status, reload } = useAsync(() => services.orders.list(), []);

  if (!orders) return status === 'error' ? <PageError onRetry={reload} /> : <PageLoading />;

  if (orders.length === 0) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Você ainda não fez pedidos</h1>
        <p className="mt-2 text-slate-500">Quando você comprar, seus pedidos aparecerão aqui.</p>
        <Link
          to="/catalogo"
          className="mt-6 inline-block rounded-full bg-slate-900 px-8 py-3 text-sm font-bold text-white hover:bg-slate-700"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl pb-20">
      <h1 className="mb-8 text-2xl font-bold tracking-tight">Meus pedidos</h1>

      <ul className="space-y-4">
        {orders.map((order) => {
          const current = getStatus(order);
          const count = order.items.reduce((sum, item) => sum + item.quantity, 0);
          const extra = order.items.length - MAX_THUMBS;

          return (
            <li key={order.id}>
              <Link
                to={`/pedido/${order.id}`}
                className="block rounded-xl border border-slate-200 p-5 transition-colors hover:border-slate-900"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold">Pedido #{order.id}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')} · {count}{' '}
                      {count === 1 ? 'item' : 'itens'}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tones[current.tone]}`}>
                    {current.label}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center -space-x-2">
                    {order.items.slice(0, MAX_THUMBS).map((item) => (
                      <img
                        key={item.key}
                        src={item.image}
                        alt={item.title}
                        className="h-14 w-11 bg-slate-100 object-cover ring-2 ring-white"
                      />
                    ))}
                    {extra > 0 && (
                      <span className="flex h-14 w-11 items-center justify-center bg-slate-100 text-xs font-semibold text-slate-600 ring-2 ring-white">
                        +{extra}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-bold">{formatBRL(order.total)}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}