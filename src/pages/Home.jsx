import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

export default function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <div className="space-y-12 pb-16">
      <section className="rounded-2xl bg-slate-900 px-8 py-16 text-center text-white">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">Nova coleção</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Estilo que acompanha você</h1>
        <p className="mx-auto mt-4 max-w-md text-slate-300">
          Peças selecionadas com até 30% de desconto por tempo limitado.
        </p>
        <Link
          to="/catalogo"
          className="mt-8 inline-block rounded-full bg-blue-600 px-8 py-3 text-sm font-bold transition-colors hover:bg-blue-500"
        >
          Ver catálogo
        </Link>
      </section>

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
  );
}