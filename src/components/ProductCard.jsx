import { Link } from 'react-router-dom';
import { formatBRL, getDiscount } from '../utils/format';

export default function ProductCard({ product }) {
  const { id, title, brand, price, oldPrice, image, sizes } = product;
  const discount = getDiscount(price, oldPrice);

  return (
    <Link to={`/produto/${id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-slate-200">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white/90 p-2 text-center text-xs font-medium text-slate-600 transition-transform group-hover:translate-y-0">
          Tamanhos: {sizes.join(' · ')}
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{brand}</p>
        <h3 className="line-clamp-2 text-sm font-medium text-slate-800">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-slate-900">{formatBRL(price)}</span>
          {oldPrice && (
            <span className="text-xs text-slate-400 line-through">{formatBRL(oldPrice)}</span>
          )}
        </div>
        <p className="text-xs text-slate-500">até 6x de {formatBRL(price / 6)}</p>
      </div>
    </Link>
  );
}