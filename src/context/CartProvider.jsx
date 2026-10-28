import { useEffect, useMemo, useReducer } from 'react';
import { CartContext } from './cart-context';
import { useAuth } from '../hooks/useAuth';
import { getUserStorageId } from '../utils/userStorage';

const MAX_QTY = 10;

const clamp = (n) => Math.max(1, Math.min(MAX_QTY, n));

function reducer(state, action) {
  if (action.type === 'LOAD') {
    return { owner: action.owner, items: action.items };
  }
  if (state.owner !== action.owner) return state;

  switch (action.type) {
    case 'ADD': {
      const { product, size, quantity } = action;
      const key = `${product.id}-${size}`;
      const existing = state.items.find((i) => i.key === key);

      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: clamp(i.quantity + quantity) } : i
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            key,
            id: product.id,
            title: product.title,
            brand: product.brand,
            price: product.price,
            image: product.image,
            size,
            quantity: clamp(quantity),
          },
        ],
      };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.key !== action.key) };
    case 'SET_QTY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.key === action.key ? { ...i, quantity: clamp(action.quantity) } : i
        ),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

function loadUserCart(owner) {
  if (!owner) return [];

  try {
    const raw = localStorage.getItem(`cart_${encodeURIComponent(owner)}`);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function CartProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const owner = isAuthenticated ? getUserStorageId(user) : null;
  const [state, dispatch] = useReducer(reducer, { owner: null, items: [] });

  useEffect(() => {
    dispatch({ type: 'LOAD', owner, items: loadUserCart(owner) });
  }, [owner]);

  const items = useMemo(
    () => (state.owner === owner && owner ? state.items : []),
    [owner, state]
  );

  useEffect(() => {
    if (!owner || state.owner !== owner) return;

    try {
      localStorage.setItem(`cart_${encodeURIComponent(owner)}`, JSON.stringify(state.items));
    } catch {
      // armazenamento indisponível: o carrinho segue funcionando em memória
    }
  }, [owner, state]);

  const value = useMemo(
    () => ({
      items,
      totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      maxQuantity: MAX_QTY,
      addItem: (product, size, quantity = 1) => {
        if (!owner) return;
        if (state.owner !== owner) {
          dispatch({ type: 'LOAD', owner, items: loadUserCart(owner) });
        }
        dispatch({ type: 'ADD', owner, product, size, quantity });
      },
      removeItem: (key) => owner && dispatch({ type: 'REMOVE', owner, key }),
      updateQuantity: (key, quantity) =>
        owner && dispatch({ type: 'SET_QTY', owner, key, quantity }),
      clearCart: () => owner && dispatch({ type: 'CLEAR', owner }),
    }),
    [items, owner, state.owner]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}