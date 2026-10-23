import { compareSizes, matchesGender } from '../utils/products';

const to = (params) => `/catalogo?${new URLSearchParams(params)}`;
const unique = (values) => [...new Set(values)];
const byName = (a, b) => a.localeCompare(b);

const kidsLabels = { bebe: 'Bebês', menina: 'Menina', menino: 'Menino' };

// Monta um menu só com o que existe nos produtos: nunca gera link para uma página vazia.
function buildMenu(products, base, filter, extraColumns = []) {
  const scoped = products.filter(filter);

  const categories = unique(scoped.map((p) => p.category));
  const sizes = unique(scoped.flatMap((p) => p.sizes))
    .filter((s) => s !== 'Único')
    .sort(compareSizes);
  const brands = unique(scoped.map((p) => p.brand)).sort(byName);

  const columns = [...extraColumns];

  if (categories.length > 0) {
    columns.push({
      title: 'Categorias',
      links: categories.map((c) => ({ label: c, to: to({ ...base, categoria: c }) })),
      sizes: sizes.map((s) => ({ label: s, to: to({ ...base, tamanho: s }) })),
      seeAll: to(base),
    });
  }

  if (brands.length > 0) {
    columns.push({
      title: 'Marcas',
      links: brands.map((b) => ({ label: b, to: to({ ...base, marca: b }) })),
    });
  }

  if (scoped.some((p) => p.oldPrice)) {
    columns.push({
      title: 'Destaques',
      links: [{ label: 'Em promoção', to: to({ ...base, promocao: '1' }) }],
    });
  }

  return { to: to(base), columns };
}

export function buildMenus(products) {
  const menus = {};

  for (const [name, genero] of [['Feminino', 'feminino'], ['Masculino', 'masculino']]) {
    const filter = (p) => matchesGender(p, genero);
    if (products.some(filter)) menus[name] = buildMenu(products, { genero }, filter);
  }

  const kids = products.filter((p) => p.gender === 'infantil');
  if (kids.length > 0) {
    const publico = {
      title: 'Público',
      links: Object.entries(kidsLabels)
        .filter(([key]) => kids.some((p) => p.kids === key))
        .map(([key, label]) => ({ label, to: to({ genero: 'infantil', publico: key }) })),
    };
    menus.Infantil = buildMenu(products, { genero: 'infantil' }, (p) => p.gender === 'infantil', [publico]);
  }

  if (products.some((p) => p.sport)) {
    menus.Esportivo = buildMenu(products, { esporte: '1' }, (p) => p.sport);
  }

  const brands = unique(products.map((p) => p.brand)).sort(byName);
  if (brands.length > 0) {
    menus.Marcas = {
      to: '/catalogo',
      columns: [
        {
          title: 'Marcas',
          links: brands.map((b) => ({ label: b, to: to({ marca: b }) })),
          seeAll: '/catalogo',
        },
      ],
    };
  }

  return menus;
}