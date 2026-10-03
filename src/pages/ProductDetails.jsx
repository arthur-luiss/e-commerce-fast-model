import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../data/products';
import { formatBRL, getDiscount } from '../utils/format';
import { useCart } from '../hooks/useCart';

function ProductView({ product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [showError, setShowError] = useState(false);

  const discount = getDiscount(product.price, product.oldPrice);

  const handleAdd = () => {
    if (!size) {
      setShowError(true);
      return;
    }
    addItem(product, size, 1);
    setAdded(true);
  };

  const handleSelectSize = (s) => {
    setSize(s);
    setShowError(false);
    setAdded(false);
  };

  return (
    <div className="pb-16">
      <Link to="/catalogo" className="text-sm font-semibold text-slate-500 hover:text-blue-600">
        ← Voltar ao catálogo
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="aspect-3/4 overflow-hidden rounded-xl bg-slate-200">
          <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{product.brand}</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight">{product.title}</h1>
          </div>

          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">{formatBRL(product.price)}</span>
              {product.oldPrice && (
                <span className="text-slate-400 line-through">{formatBRL(product.oldPrice)}</span>
              )}
              {discount > 0 && (
                <span className="rounded bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
                  -{discount}%
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-500">
              ou 6x de {formatBRL(product.price / 6)} sem juros
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold">Tamanho</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSelectSize(s)}
                  className={`min-w-12 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                    size === s
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-900'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {showError && (
              <p className="mt-2 text-sm font-medium text-red-600">Selecione um tamanho para continuar.</p>
            )}
          </div>

          <button
            onClick={handleAdd}
            className="w-full rounded-full bg-blue-600 py-4 text-sm font-bold text-white transition-colors hover:bg-blue-500"
          >
            Adicionar ao carrinho
          </button>

          {added && (
            <p className="text-center text-sm font-medium text-green-600">
              Produto adicionado!{' '}
              <Link to="/carrinho" className="underline">Ver carrinho</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-500">Produto não encontrado.</p>
        <Link to="/catalogo" className="mt-4 inline-block font-semibold text-blue-600 hover:underline">
          Voltar ao catálogo
        </Link>
      </div>
    );
  }

  return <ProductView key={product.id} product={product} />;
}