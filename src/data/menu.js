import { products, categories, matchesGender } from './products';

const to = (params) => `/catalogo?${new URLSearchParams(params)}`;

const adultSizes = ['P', 'M', 'G', 'GG'];
const kidsSizes = ['0-12M', '1-4', '5-8', '9-12'];
const exclusiveBrands = ['Urban Basic', 'Street Co.'];

const brandsOf = (filter) => [...new Set(products.filter(filter).map((p) => p.brand))];

const categoriesOf = (filter) =>
  categories.filter(
    (c) => c !== 'Acessórios' && products.some((p) => p.category === c && filter(p))
  );

const clothesColumn = ({ title = 'Roupas', base, filter, sizes }) => ({
  title,
  links: categoriesOf(filter).map((c) => ({ label: c, to: to({ ...base, categoria: c }) })),
  sizes: sizes.map((s) => ({ label: s, to: to({ ...base, tamanho: s }) })),
  seeAll: to(base),
});

const accessoriesColumn = (base, items) => ({
  title: 'Acessórios',
  links: items.map((a) => ({ label: a.label, to: to({ ...base, busca: a.term }) })),
  seeAll: to({ ...base, categoria: 'Acessórios' }),
});

const brandsColumn = (base, filter) => ({
  title: 'Marcas',
  links: brandsOf(filter).map((b) => ({ label: b, to: to({ ...base, marca: b }) })),
});

const highlightsColumn = (base) => ({
  title: 'Destaques',
  links: [{ label: 'Em promoção', to: to({ ...base, promocao: '1' }) }],
});

const adultMenu = (genero, accessories) => {
  const base = { genero };
  const filter = (p) => matchesGender(p, genero);
  return {
    to: to(base),
    columns: [
      clothesColumn({ base, filter, sizes: adultSizes }),
      accessoriesColumn(base, accessories),
      brandsColumn(base, filter),
      highlightsColumn(base),
    ],
  };
};

const kidsMenu = () => {
  const base = { genero: 'infantil' };
  const filter = (p) => p.gender === 'infantil';
  return {
    to: to(base),
    columns: [
      {
        title: 'Público',
        links: [
          { label: 'Bebês', to: to({ ...base, publico: 'bebe' }) },
          { label: 'Menina', to: to({ ...base, publico: 'menina' }) },
          { label: 'Menino', to: to({ ...base, publico: 'menino' }) },
        ],
      },
      clothesColumn({ base, filter, sizes: kidsSizes }),
      accessoriesColumn(base, [{ label: 'Bonés', term: 'Boné' }]),
      brandsColumn(base, filter),
      highlightsColumn(base),
    ],
  };
};

const sportMenu = () => {
  const base = { esporte: '1' };
  const filter = (p) => p.sport;
  return {
    to: to(base),
    columns: [
      clothesColumn({ title: 'Moda esportiva', base, filter, sizes: adultSizes }),
      brandsColumn(base, filter),
      highlightsColumn(base),
    ],
  };
};

const brandsMenu = () => ({
  to: '/catalogo',
  columns: [
    {
      title: 'Exclusivas na Loja',
      links: exclusiveBrands.map((b) => ({ label: b, to: to({ marca: b }) })),
    },
    {
      title: 'Marcas parceiras',
      links: brandsOf((p) => !exclusiveBrands.includes(p.brand)).map((b) => ({
        label: b,
        to: to({ marca: b }),
      })),
      seeAll: '/catalogo',
    },
  ],
});

// A ordem das chaves é a ordem exibida no cabeçalho.
export const menus = {
  Feminino: adultMenu('feminino', [{ label: 'Bonés', term: 'Boné' }]),
  Masculino: adultMenu('masculino', [
    { label: 'Bonés', term: 'Boné' },
    { label: 'Cintos', term: 'Cinto' },
  ]),
  Infantil: kidsMenu(),
  Esportivo: sportMenu(),
  Marcas: brandsMenu(),
};