import { useMemo } from 'react';
import { ReviewsContext } from './reviews-context';
import { useAsync } from '../hooks/useAsync';
import { services } from '../services';

export default function ReviewsProvider({ children }) {
  const { data, reload } = useAsync(() => services.reviews.summaries(), []);
  const summaries = useMemo(() => data ?? {}, [data]);

  const value = useMemo(
    () => ({
      getSummary: (productId) => summaries[productId] ?? { count: 0, average: 0 },
      addReview: async (input) => {
        const review = await services.reviews.create(input);
        reload();
        return review;
      },
      removeReview: async (id) => {
        await services.reviews.remove(id);
        reload();
      },
    }),
    [summaries, reload]
  );

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>;
}