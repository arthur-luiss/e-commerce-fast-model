import { useEffect, useMemo, useState } from 'react';
import { ReviewsContext } from './reviews-context';
import { brand } from '../config/brand';
import { getMockReviews } from '../data/reviews';
import { hasPurchased } from '../utils/orders';
import { summarize } from '../utils/reviews';

const STORAGE_KEY = `${brand.slug}:reviews`;

const isValid = (r) =>
  r &&
  Number.isInteger(r.productId) &&
  Number.isInteger(r.rating) &&
  r.rating >= 1 &&
  r.rating <= 5 &&
  typeof r.name === 'string' &&
  typeof r.comment === 'string' &&
  typeof r.createdAt === 'number';

function loadInitialState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter(isValid) : [];
  } catch {
    return [];
  }
}

export default function ReviewsProvider({ children }) {
  const [mine, setMine] = useState(loadInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mine));
    } catch {
      // armazenamento indisponível: as avaliações seguem funcionando em memória
    }
  }, [mine]);

  const value = useMemo(() => {
    const getReviews = (productId) =>
      [...mine.filter((r) => r.productId === productId), ...getMockReviews(productId)].sort(
        (a, b) => b.createdAt - a.createdAt
      );

    return {
      getReviews,
      getSummary: (productId) => summarize(getReviews(productId)),
      getMyReview: (productId) => mine.find((r) => r.productId === productId) ?? null,
      addReview: ({ productId, rating, name, comment }) =>
        setMine((prev) => [
          {
            id: `u-${Date.now()}`,
            productId,
            rating,
            name: name.trim(),
            comment: comment.trim(),
            createdAt: Date.now(),
            verified: hasPurchased(productId),
            mine: true,
          },
          ...prev.filter((r) => r.productId !== productId), // uma avaliação por produto
        ]),
      removeReview: (id) => setMine((prev) => prev.filter((r) => r.id !== id)),
    };
  }, [mine]);

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>;
}