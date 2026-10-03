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
    `shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
      active
        ? 'border-slate-900 bg-slate-900 text-white'
        : 'border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900'
    }`;

  const title = rawSearch ? `Resultados para "${rawSearch}"` : (category ?? 'Todos os produtos');

  return (
    <div className="pb-20">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{visible.length} produtos</p>
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Ordenar produtos"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none hover:border-slate-900"
        >
          <option value="relevance">Relevância</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
        </select>
      </div>

      <div className="mb-8 flex gap-2 overflow-x-auto pb-1 scrollbar-width:none">
        <button onClick={() => selectCategory(null)} className={chip(!category)}>Todos</button>
        {categories.map((cat) => (
          <button key={cat} onClick={() => selectCategory(cat)} className={chip(category === cat)}>
            {cat}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-20 text-center text-slate-500">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}