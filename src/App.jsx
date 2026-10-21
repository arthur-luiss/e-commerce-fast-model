import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import CartProvider from "./context/CartProvider";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import FavoritesProvider from "./context/FavoritesProvider";
import Favorites from "./pages/Favorites";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Orders from "./pages/Orders";
import ReviewsProvider from "./context/ReviewsProvider";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import InfoPage from "./pages/InfoPage";
import Contact from "./pages/Contact";
import ConsentProvider from "./context/ConsentProvider";
import CookieBanner from "./components/CookieBanner";

function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900 selection:bg-slate-200">
      <Navbar overHero={isHome} />
      <main
        className={`flex-1 ${isHome ? "" : "mx-auto w-full max-w-7xl px-6 pt-8"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/produto/:id" element={<ProductDetails />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pedido/:id" element={<OrderConfirmation />} />
          <Route path="/pedidos" element={<Orders />} />
          <Route path="/institucional/:slug" element={<InfoPage />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <CartProvider>
        <FavoritesProvider>
          <ReviewsProvider>
            <ConsentProvider>
              <Layout />
            </ConsentProvider>
          </ReviewsProvider>
        </FavoritesProvider>
      </CartProvider>
    </Router>
  );
}
