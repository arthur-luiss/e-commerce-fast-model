import Icon from './Icon';
import StarRating from './StarRating';
import { formatRating } from '../utils/reviews';

export default function RatingSummary({ summary }) {
  const { average, count, distribution } = summary;

  if (count === 0) {
    return <p className="text-sm text-slate-500">Este produto ainda não tem avaliações.</p>;
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="text-5xl font-bold tracking-tight">{formatRating(average)}</span>
        <div>
          <StarRating value={average} size="h-5 w-5" />
          <p className="mt-1 text-sm text-slate-500">
            {count} {count === 1 ? 'avaliação' : 'avaliações'}
          </p>
        </div>
      </div>

      <ul className="mt-5 space-y-2">
        {[5, 4, 3, 2, 1].map((n) => (
          <li key={n} className="flex items-center gap-3 text-xs text-slate-500">
            <span className="w-3 text-right">{n}</span>
            <Icon name="star" className="h-3.5 w-3.5 text-amber-400" filled />
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
              <span
                className="block h-full rounded-full bg-amber-400"
                style={{ width: `${(distribution[n] / count) * 100}%` }}
              />
            </span>
            <span className="w-6">{distribution[n]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}