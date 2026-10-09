import { useEffect, useMemo, useState } from 'react';
import { FavoritesContext } from './favorites-context';

const STORAGE_KEY = 'loja:favorites';

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(loadInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // armazenamento indisponível: os favoritos seguem funcionando em memória
    }
  }, [ids]);

  const value = useMemo(
    () => ({
      ids,
      count: ids.length,
      isFavorite: (id) => ids.includes(id),
      toggleFavorite: (id) =>
        setIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])),
    }),
    [ids]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}