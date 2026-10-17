import { useState } from 'react';
import Icon from './Icon';
import StarRating from './StarRating';

const PAGE_SIZE = 5;

const sorters = {
  recent: (a, b) => b.createdAt - a.createdAt,
  best: (a, b) => b.rating - a.rating || b.createdAt - a.createdAt,
  worst: (a, b) => a.rating - b.rating || b.createdAt - a.createdAt,
};

export default function ReviewList({ reviews, onRemove }) {
  const [sort, setSort] = useState('recent');
  const [visible, setVisible] = useState(PAGE_SIZE);

  if (reviews.length === 0) {
    return <p className="text-sm text-slate-500">Seja a primeira pessoa a avaliar este produto.</p>;
  }

  const sorted = [...reviews].sort(sorters[sort]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          {reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'}
        </p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Ordenar avaliações"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm outline-none hover:border-slate-900"
        >
          <option value="recent">Mais recentes</option>
          <option value="best">Maior nota</option>
          <option value="worst">Menor nota</option>
        </select>
      </div>

      <ul>
        {sorted.slice(0, visible).map((r) => (
          <li key={r.id} className="border-b border-slate-100 py-5 first:pt-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <StarRating value={r.rating} />
              <span className="text-sm font-semibold">{r.name}</span>
              {r.mine && (
                <span className="rounded bg-slate-900 px-1.5 py-0.5 text-[11px] font-semibold text-white">
                  Sua avaliação
                </span>
              )}
              {r.verified && (
                <span className="inline-flex items-center gap-1 text-xs text-green-600">
                  <Icon name="check" className="h-3.5 w-3.5" />
                  Compra verificada
                </span>
              )}
            </div>

            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">{r.comment}</p>

            <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
              <time dateTime={new Date(r.createdAt).toISOString()}>
                {new Date(r.createdAt).toLocaleDateString('pt-BR')}
              </time>
              {r.mine && (
                <button
                  onClick={() => onRemove(r.id)}
                  className="font-medium text-slate-500 underline hover:text-red-600"
                >
                  Excluir
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {visible < sorted.length && (
        <button
          onClick={() => setVisible((v) => v + PAGE_SIZE)}
          className="mt-6 rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold hover:border-slate-900"
        >
          Ver mais avaliações
        </button>
      )}
    </div>
  );
}