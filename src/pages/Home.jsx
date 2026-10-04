import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import BenefitsBar from '../components/BenefitsBar';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

export default function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <>
      <Hero />
      <BenefitsBar />

      <div className="max-w-7xl space-y-12 px-6 py-12">
        <section>
          <h2 className="mb-4 text-xl font-bold">Compre por categoria</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/catalogo?categoria=${encodeURIComponent(cat)}`}
                className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-600 hover:text-blue-600"
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-xl font-bold">Destaques da coleção</h2>
            <Link to="/catalogo" className="text-sm font-semibold text-blue-600 hover:underline">
              Ver tudo →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}