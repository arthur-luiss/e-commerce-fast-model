import { useState } from 'react';
import Field from './Field';
import Icon from './Icon';
import { MAX_COMMENT, MAX_NAME, validateReview } from '../utils/reviews';

const labels = ['', 'Ruim', 'Regular', 'Bom', 'Muito bom', 'Excelente'];

export default function ReviewForm({ productId, alreadyReviewed, onSubmit }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  if (alreadyReviewed) {
    return (
      <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
        {sent
          ? 'Obrigado! Sua avaliação foi publicada.'
          : 'Você já avaliou este produto. Para avaliar de novo, exclua a sua avaliação na lista.'}
      </p>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-full border border-slate-900 py-3 text-sm font-bold transition-colors hover:bg-slate-900 hover:text-white"
      >
        Escrever avaliação
      </button>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateReview({ rating, name, comment });
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    onSubmit({ productId, rating, name, comment });
    setSent(true);
    setOpen(false);
    setRating(0);
    setName('');
    setComment('');
    setErrors({});
  };

  const shown = hover || rating;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 rounded-xl border border-slate-200 p-5">
      <div>
        <p id="rating-label" className="mb-1 text-xs font-medium text-slate-600">
          Sua nota
        </p>
        <div role="radiogroup" aria-labelledby="rating-label" className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} ${n === 1 ? 'estrela' : 'estrelas'}`}
              onClick={() => {
                setRating(n);
                setErrors((e) => ({ ...e, rating: undefined }));
              }}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              className={`p-0.5 transition-colors ${n <= shown ? 'text-amber-400' : 'text-slate-300'}`}
            >
              <Icon name="star" className="h-8 w-8" filled />
            </button>
          ))}
          {shown > 0 && <span className="ml-2 text-sm text-slate-500">{labels[shown]}</span>}
        </div>
        {errors.rating && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            {errors.rating}
          </p>
        )}
      </div>

      <Field
        label="Seu nome"
        hint="Aparece junto da avaliação. Se preferir, use só o primeiro nome."
        autoComplete="name"
        maxLength={MAX_NAME}
        value={name}
        error={errors.name}
        onChange={(e) => {
          setName(e.target.value);
          setErrors((er) => ({ ...er, name: undefined }));
        }}
      />

      <div>
        <label htmlFor="review-comment" className="mb-1 block text-xs font-medium text-slate-600">
          Sua avaliação
        </label>
        <textarea
          id="review-comment"
          rows={4}
          maxLength={MAX_COMMENT}
          value={comment}
          aria-invalid={Boolean(errors.comment)}
          onChange={(e) => {
            setComment(e.target.value);
            setErrors((er) => ({ ...er, comment: undefined }));
          }}
          className={`w-full resize-y rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors ${
            errors.comment ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-slate-900'
          }`}
        />
        <div className="mt-1 flex justify-between text-xs">
          <span role={errors.comment ? 'alert' : undefined} className="text-red-600">
            {errors.comment}
          </span>
          <span className="text-slate-400">
            {comment.length}/{MAX_COMMENT}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 rounded-full bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-700"
        >
          Publicar avaliação
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold hover:border-slate-900"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}