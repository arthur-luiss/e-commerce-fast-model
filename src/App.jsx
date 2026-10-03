import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">
        <Navbar />
        <main className="mx-auto mt-8 max-w-6xl px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/produto/:id" element={<ProductDetails />} />
            <Route path="/carrinho" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}