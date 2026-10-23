import { useReviews } from '../hooks/useReviews';
import { summarize } from '../utils/reviews';
import RatingSummary from './RatingSummary';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

export default function ProductReviews({ product }) {
  const { getReviews, getMyReview, addReview, removeReview } = useReviews();
  const reviews = getReviews(product.id);

  return (
    <section id="avaliacoes" className="mt-20 scroll-mt-32">
      <h2 className="mb-6 text-xl font-bold tracking-tight">Avaliações</h2>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-8">
          <RatingSummary summary={summarize(reviews)} />
          <ReviewForm
            productId={product.id}
            alreadyReviewed={Boolean(getMyReview(product.id))}
            onSubmit={addReview}
          />
        </div>

        <div className="lg:col-span-2">
          <ReviewList reviews={reviews} onRemove={removeReview} />
        </div>
      </div>
    </section>
  );
}