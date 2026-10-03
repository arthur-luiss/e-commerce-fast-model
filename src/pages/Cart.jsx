import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatBRL } from '../utils/format';

const FREE_SHIPPING_MIN = 199;
const SHIPPING_FEE = 19.9;

export default function Cart() {
  const { items, subtotal, maxQuantity, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-black">Seu carrinho está vazio</h1>
        <p className="mt-2 text-slate-500">Que tal dar uma olhada nos nossos lançamentos?</p>
        <Link
          to="/catalogo"
          className="mt-6 inline-block rounded-full bg-blue-600 px-8 py-3 text-sm font-bold text-white hover:bg-blue-500"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const missing = FREE_SHIPPING_MIN - subtotal;

  return (
    <div className="pb-16">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-black">Carrinho</h1>
        <button onClick={clearCart} className="text-sm font-semibold text-slate-500 hover:text-red-600">
          Esvaziar carrinho
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.key} className="flex gap-4 rounded-xl bg-white p-4 shadow-sm">
              <Link to={`/produto/${item.id}`} className="h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-200">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{item.brand}</p>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-slate-500">Tamanho: {item.size}</p>
                  </div>
                  <p className="text-sm font-bold">{formatBRL(item.price * item.quantity)}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-slate-300">
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 text-lg text-slate-600 disabled:opacity-30"
                      aria-label="Diminuir quantidade"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      disabled={item.quantity >= maxQuantity}
                      className="px-3 py-1 text-lg text-slate-600 disabled:opacity-30"
                      aria-label="Aumentar quantidade"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.key)}
                    className="text-sm font-semibold text-slate-500 hover:text-red-600"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit space-y-4 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold">Resumo do pedido</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal</span>
              <span>{formatBRL(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Frete</span>
              <span className={shipping === 0 ? 'font-semibold text-green-600' : ''}>
                {shipping === 0 ? 'Grátis' : formatBRL(shipping)}
              </span>
            </div>
          </div>

          {missing > 0 && (
            <p className="rounded-lg bg-blue-50 p-3 text-xs text-blue-700">
              Faltam {formatBRL(missing)} para ganhar frete grátis.
            </p>
          )}

          <div className="flex justify-between border-t border-slate-200 pt-4 text-base font-bold">
            <span>Total</span>
            <span>{formatBRL(total)}</span>
          </div>
          <p className="-mt-2 text-right text-xs text-slate-500">
            ou 6x de {formatBRL(total / 6)} sem juros
          </p>

          <button className="w-full rounded-full bg-slate-900 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-700">
            Finalizar compra
          </button>
        </aside>
      </div>
    </div>
  );
}