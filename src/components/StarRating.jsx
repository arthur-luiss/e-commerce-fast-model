import Icon from './Icon';
import { formatRating } from '../utils/reviews';

export default function StarRating({ value, size = 'h-4 w-4' }) {
  const percent = (Math.max(0, Math.min(5, value)) / 5) * 100;
  const stars = [0, 1, 2, 3, 4];

  return (
    <span role="img" aria-label={`Nota ${formatRating(value)} de 5`} className="relative inline-flex">
      <span className="flex text-slate-300">
        {stars.map((i) => (
          <Icon key={i} name="star" className={`${size} shrink-0`} filled />
        ))}
      </span>
      <span
        className="absolute inset-y-0 left-0 flex overflow-hidden text-amber-400"
        style={{ width: `${percent}%` }}
      >
        {stars.map((i) => (
          <Icon key={i} name="star" className={`${size} shrink-0`} filled />
        ))}
      </span>
    </span>
  );
}