import { useAsync } from '../hooks/useAsync';
import { useReviews } from '../hooks/useReviews';
import { services } from '../services';
import { summarize } from '../utils/reviews';
import RatingSummary from './RatingSummary';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

export default function ProductReviews({ product }) {
  const { addReview, removeReview } = useReviews();
  const { data, status, reload } = useAsync(() => services.reviews.listByProduct(product.id), [product.id]);

  const handleAdd = async (input) => {
    await addReview(input); // se falhar, o formulário mostra o erro
    reload();
  };

  const handleRemove = async (id) => {
    try {
      await removeReview(id);
    } catch {
      // a lista é recarregada abaixo e mostra o estado real
    }
    reload();
  };

  let body;
  if (!data) {
    body =
      status === 'error' ? (
        <p role="alert" className="text-sm text-slate-600">
          Não foi possível carregar as avaliações.{' '}
          <button onClick={reload} className="font-semibold underline">
            Tentar de novo
          </button>
        </p>
      ) : (
        <p role="status" className="text-sm text-slate-500">
          Carregando avaliações...
        </p>
      );
  } else {
    body = (
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-8">
          <RatingSummary summary={summarize(data)} />
          <ReviewForm
            productId={product.id}
            alreadyReviewed={data.some((r) => r.mine)}
            onSubmit={handleAdd}
          />
        </div>
        <div className="lg:col-span-2">
          <ReviewList reviews={data} onRemove={handleRemove} />
        </div>
      </div>
    );
  }

  return (
    <section id="avaliacoes" className="mt-20 scroll-mt-32">
      <h2 className="mb-6 text-xl font-bold tracking-tight">Avaliações</h2>
      {body}
    </section>
  );
}