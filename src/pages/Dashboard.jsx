import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { PageError, PageLoading } from '../components/PageState';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { useProducts } from '../hooks/useProducts';
import { formatBRL } from '../utils/format';
import { getShipping } from '../utils/shipping';
import { sameId } from '../utils/products';

function formatCreatedAt(date) {
  if (!date) return 'Não informado';

  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? 'Não informado'
    : parsedDate.toLocaleDateString('pt-BR');
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { ids } = useFavorites();
  const { items, totalItems, subtotal } = useCart();
  const { products, status, reload } = useProducts();
  const navigate = useNavigate();

  const favoriteProducts = products.filter((product) =>
    ids.some((id) => sameId(id, product.id)),
  );
  const shipping = getShipping(subtotal);
  const initials = user?.name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="pb-20">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Minha conta
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          Olá, {user?.name?.trim().split(/\s+/)[0] || 'cliente'}
        </h1>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white">
            {initials}
          </div>
          <div className="grid flex-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Nome
              </p>
              <p className="mt-1 text-sm font-semibold">{user?.name || '—'}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                E-mail
              </p>
              <p className="mt-1 break-all text-sm font-semibold">{user?.email || '—'}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Cadastro
              </p>
              <p className="mt-1 text-sm font-semibold">
                {formatCreatedAt(user?.created_at || user?.createdAt)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="shrink-0 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            Sair da conta
          </button>
        </div>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">Meus favoritos</h2>
              <p className="mt-1 text-sm text-slate-500">
                {favoriteProducts.length} {favoriteProducts.length === 1 ? 'produto salvo' : 'produtos salvos'}
              </p>
            </div>
            <Link
              to="/favoritos"
              className="text-sm font-semibold underline underline-offset-4"
            >
              Ver todos
            </Link>
          </div>

          {status === 'loading' ? (
            <PageLoading />
          ) : status === 'error' ? (
            <PageError onRetry={reload} />
          ) : favoriteProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3">
              {favoriteProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center">
              <p className="text-sm text-slate-500">
                Você ainda não salvou nenhum produto.
              </p>
              <Link
                to="/catalogo"
                className="mt-3 inline-block text-sm font-semibold underline underline-offset-4"
              >
                Explorar catálogo
              </Link>
            </div>
          )}
        </section>

        <section className="h-fit rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Meu carrinho</h2>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold">
              {totalItems} {totalItems === 1 ? 'item' : 'itens'}
            </span>
          </div>

          {items.length > 0 ? (
            <>
              <ul className="mt-5 space-y-4">
                {items.slice(0, 3).map((item) => (
                  <li key={item.key} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt=""
                      className="h-14 w-12 rounded-md bg-slate-100 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-slate-500">
                        Qtd. {item.quantity} · Tam. {item.size}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">
                      {formatBRL(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
              {items.length > 3 && (
                <p className="mt-3 text-xs text-slate-500">
                  E mais {items.length - 3} produtos no carrinho.
                </p>
              )}
              <div className="mt-5 flex justify-between border-t border-slate-200 pt-4 text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-semibold">{formatBRL(subtotal)}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-slate-500">Frete estimado</span>
                <span className="font-semibold">
                  {shipping === 0 ? 'Grátis' : formatBRL(shipping)}
                </span>
              </div>
              <Link
                to="/carrinho"
                className="mt-5 block w-full rounded-full border border-slate-300 py-3 text-center text-sm font-bold text-slate-900 transition-colors hover:bg-slate-50"
              >
                Ver carrinho
              </Link>
              <Link
                to="/checkout"
                className="mt-3 block w-full rounded-full bg-slate-900 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-slate-700"
              >
                Finalizar compra
              </Link>
            </>
          ) : (
            <div className="mt-5 rounded-lg bg-slate-50 p-5 text-center">
              <p className="text-sm text-slate-500">Seu carrinho está vazio.</p>
              <Link
                to="/catalogo"
                className="mt-3 inline-block text-sm font-semibold underline underline-offset-4"
              >
                Ver catálogo
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
