import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('relevance');
  const category = searchParams.get('categoria');
  const rawSearch = searchParams.get('busca')?.trim() ?? '';
  const search = rawSearch.toLowerCase();

  const visible = useMemo(() => {
    const list = products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!search || `${p.title} ${p.brand} ${p.category}`.toLowerCase().includes(search))
    );
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    return list;
  }, [category, search, sort]);

  const selectCategory = (cat) => {
    const next = new URLSearchParams(searchParams);
    if (cat) next.set('categoria', cat);
    else next.delete('categoria');
    setSearchParams(next);
  };

  const chip = (active) =>
    `rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
      active
        ? 'border-blue-600 bg-blue-600 text-white'
        : 'border-slate-300 bg-white text-slate-700 hover:border-blue-600 hover:text-blue-600'
    }`;

  return (
    <div className="pb-16">
      <h1 className="mb-6 text-2xl font-black">
        {rawSearch ? `Resultados para "${rawSearch}"` : (category ?? 'Todos os produtos')}
      </h1>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => selectCategory(null)} className={chip(!category)}>Todos</button>
          {categories.map((cat) => (
            <button key={cat} onClick={() => selectCategory(cat)} className={chip(category === cat)}>
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className="text-slate-500">{visible.length} produtos</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option value="relevance">Relevância</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
          </select>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="py-20 text-center text-slate-500">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}