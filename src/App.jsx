import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CartProvider from './context/CartProvider';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import FavoritesProvider from './context/FavoritesProvider';
import Favorites from './pages/Favorites';

function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-slate-200">
      <Navbar overHero={isHome} />
      <main className={isHome ? '' : 'mx-auto max-w-7xl px-6 pt-8'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/produto/:id" element={<ProductDetails />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/favoritos" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <CartProvider>
        <FavoritesProvider>
          <Layout />
        </FavoritesProvider>
      </CartProvider>
    </Router>
  );
}