import { Link } from 'react-router-dom';
import { formatBRL, getDiscount } from '../utils/format';

export default function ProductCard({ product }) {
  const { id, title, brand, price, oldPrice, image, sizes } = product;
  const discount = getDiscount(price, oldPrice);

  return (
    <Link to={`/produto/${id}`} className="group block">
      <div className="relative aspect-3/4 overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded bg-slate-900 px-1.5 py-0.5 text-[11px] font-semibold text-white">
            -{discount}%
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white/95 py-2 text-center text-xs text-slate-600 transition-transform duration-300 group-hover:translate-y-0">
          {sizes.join('  ·  ')}
        </div>
      </div>

      <div className="mt-3 space-y-0.5">
        <p className="text-[11px] uppercase tracking-wider text-slate-400">{brand}</p>
        <h3 className="line-clamp-1 text-sm text-slate-800">{title}</h3>
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-sm font-semibold">{formatBRL(price)}</span>
          {oldPrice && <span className="text-xs text-slate-400 line-through">{formatBRL(oldPrice)}</span>}
        </div>
        <p className="text-xs text-slate-400">6x de {formatBRL(price / 6)}</p>
      </div>
    </Link>
  );
}