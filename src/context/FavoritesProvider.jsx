import { useEffect, useMemo, useReducer } from 'react';
import { FavoritesContext } from './favorites-context';
import { useAuth } from '../hooks/useAuth';
import { getUserStorageId } from '../utils/userStorage';

function loadUserFavorites(owner) {
  if (!owner) return [];

  try {
    const raw = localStorage.getItem(`favorites_${encodeURIComponent(owner)}`);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function reducer(state, action) {
  if (action.type === 'LOAD') {
    return { owner: action.owner, ids: action.ids };
  }
  if (state.owner !== action.owner) return state;

  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        ids: state.ids.includes(action.id)
          ? state.ids.filter((favoriteId) => favoriteId !== action.id)
          : [...state.ids, action.id],
      };
    default:
      return state;
  }
}

export default function FavoritesProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const owner = isAuthenticated ? getUserStorageId(user) : null;
  const [state, dispatch] = useReducer(reducer, { owner: null, ids: [] });

  useEffect(() => {
    dispatch({ type: 'LOAD', owner, ids: loadUserFavorites(owner) });
  }, [owner]);

  const ids = useMemo(
    () => (state.owner === owner && owner ? state.ids : []),
    [owner, state]
  );

  useEffect(() => {
    if (!owner || state.owner !== owner) return;

    try {
      localStorage.setItem(`favorites_${encodeURIComponent(owner)}`, JSON.stringify(state.ids));
    } catch {
      // armazenamento indisponível: os favoritos seguem funcionando em memória
    }
  }, [owner, state]);

  const value = useMemo(
    () => ({
      ids,
      count: ids.length,
      isFavorite: (id) => ids.includes(id),
      toggleFavorite: (id) => {
        if (!owner) return;
        if (state.owner !== owner) {
          dispatch({ type: 'LOAD', owner, ids: loadUserFavorites(owner) });
        }
        dispatch({ type: 'TOGGLE', owner, id });
      },
    }),
    [ids, owner, state.owner]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}