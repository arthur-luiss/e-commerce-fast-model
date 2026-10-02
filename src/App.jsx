import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// ==========================================
// COMPONENTES (Idealmente em src/components/)
// ==========================================
function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-center gap-6">
      <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold">Início</Link>
      <Link to="/catalogo" className="text-blue-600 hover:text-blue-800 font-semibold">Catálogo</Link>
      <Link to="/carrinho" className="text-blue-600 hover:text-blue-800 font-semibold">Carrinho</Link>
    </nav>
  );
}

// ==========================================
// PÁGINAS (Idealmente em src/pages/)
// ==========================================
function Home() {
  return (
    <div className="p-8 text-2xl font-bold text-center">
      Página Inicial - Destaques da Coleção
    </div>
  );
}

function Catalog() {
  return (
    <div className="p-8 text-2xl font-bold text-center">
      Catálogo de Roupas
    </div>
  );
}

function ProductDetails() {
  return (
    <div className="p-8 text-2xl font-bold text-center">
      Detalhes da Peça
    </div>
  );
}

function Cart() {
  return (
    <div className="p-8 text-2xl font-bold text-center">
      Carrinho de Compras
    </div>
  );
}

// ==========================================
// APLICAÇÃO PRINCIPAL & ROTAS
// ==========================================
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        
        <Navbar />

        <main className="max-w-6xl mx-auto mt-8">
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