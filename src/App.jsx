import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// ==========================================
// COMPONENTES
// ==========================================
function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logotipo */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
          Style<span className="text-blue-600">.</span>
        </Link>

        {/* Links de Navegação */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            Início
          </Link>
          <Link to="/catalogo" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            Catálogo
          </Link>
          <Link to="/novidades" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            Novidades
          </Link>
        </div>

        {/* Ações (Carrinho) */}
        <div className="flex items-center gap-4">
          <Link to="/carrinho" className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors">
            {/* Ícone de Carrinho (SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
            {/* Indicador de quantidade no carrinho */}
            <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
}

// ==========================================
// PÁGINAS
// ==========================================
function Home() {
  return (
    <div className="p-8 text-2xl font-bold text-center text-slate-700">
      Página Inicial - Destaques da Coleção
    </div>
  );
}

function Catalog() {
  return (
    <div className="p-8 text-2xl font-bold text-center text-slate-700">
      Catálogo de Roupas
    </div>
  );
}

function ProductDetails() {
  return (
    <div className="p-8 text-2xl font-bold text-center text-slate-700">
      Detalhes da Peça
    </div>
  );
}

function Cart() {
  return (
    <div className="p-8 text-2xl font-bold text-center text-slate-700">
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

        <main className="max-w-6xl mx-auto mt-8 px-4">
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