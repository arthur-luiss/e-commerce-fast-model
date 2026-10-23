import { useMemo } from 'react';
import { ProductsContext } from './products-context';
import { buildMenus } from '../data/menu';
import { useAsync } from '../hooks/useAsync';
import { services } from '../services';
import { getCategories, sameId } from '../utils/products';

export default function ProductsProvider({ children }) {
  const { data, status, error, reload } = useAsync(() => services.products.list(), []);
  const products = useMemo(() => data ?? [], [data]);

  const value = useMemo(
    () => ({
      products,
      status,
      error,
      reload, // o painel do dono chama depois de salvar um produto
      categories: getCategories(products),
      menus: buildMenus(products),
      getProductById: (id) => products.find((p) => sameId(p.id, id)) ?? null,
    }),
    [products, status, error, reload]
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}