import { useContext } from 'react';
import { ReviewsContext } from '../context/reviews-context';

export function useReviews() {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error('useReviews deve ser usado dentro de <ReviewsProvider>');
  return ctx;
}