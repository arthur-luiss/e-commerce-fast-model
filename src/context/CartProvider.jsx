import { useEffect, useMemo, useReducer } from 'react';
import { CartContext } from './cart-context';

const STORAGE_KEY = 'loja:cart';
const MAX_QTY = 10;

const clamp = (n) => Math.max(1, Math.min(MAX_QTY, n));

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { product, size, quantity } = action;
      const key = `${product.id}-${size}`;
      const existing = state.find((i) => i.key === key);

      if (existing) {
        return state.map((i) =>
          i.key === key ? { ...i, quantity: clamp(i.quantity + quantity) } : i
        );
      }

      return [
        ...state,
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
      ];
    }
    case 'REMOVE':
      return state.filter((i) => i.key !== action.key);
    case 'SET_QTY':
      return state.map((i) =>
        i.key === action.key ? { ...i, quantity: clamp(action.quantity) } : i
      );
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], loadInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // armazenamento indisponível: o carrinho segue funcionando em memória
    }
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      maxQuantity: MAX_QTY,
      addItem: (product, size, quantity = 1) =>
        dispatch({ type: 'ADD', product, size, quantity }),
      removeItem: (key) => dispatch({ type: 'REMOVE', key }),
      updateQuantity: (key, quantity) => dispatch({ type: 'SET_QTY', key, quantity }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}