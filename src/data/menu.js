import { products } from './products';

const to = (params) => `/catalogo?${new URLSearchParams(params)}`;

const brands = [...new Set(products.map((p) => p.brand))];
const sizes = ['P', 'M', 'G', 'GG'];

function buildMenu({ genero, clothes, accessories }) {
  return {
    to: to({ genero }),
    columns: [
      {
        title: 'Roupas',
        links: clothes.map((c) => ({ label: c, to: to({ genero, categoria: c }) })),
        sizes: sizes.map((s) => ({ label: s, to: to({ genero, tamanho: s }) })),
        seeAll: to({ genero }),
      },
      {
        title: 'Acessórios',
        links: accessories.map((a) => ({ label: a.label, to: to({ genero, busca: a.term }) })),
        seeAll: to({ genero, categoria: 'Acessórios' }),
      },
      {
        title: 'Marcas',
        links: brands.map((b) => ({ label: b, to: to({ genero, busca: b }) })),
      },
      {
        title: 'Destaques',
        links: [{ label: 'Em promoção', to: to({ genero, promocao: '1' }) }],
      },
    ],
  };
}

// Para criar outro menu (Infantil, Esportivo...), basta adicionar uma chave aqui.
export const menus = {
  Feminino: buildMenu({
    genero: 'feminino',
    clothes: ['Camisetas', 'Calças', 'Vestidos', 'Jaquetas'],
    accessories: [{ label: 'Bonés', term: 'Boné' }],
  }),
  Masculino: buildMenu({
    genero: 'masculino',
    clothes: ['Camisetas', 'Calças', 'Jaquetas'],
    accessories: [
      { label: 'Bonés', term: 'Boné' },
      { label: 'Cintos', term: 'Cinto' },
    ],
  }),
};