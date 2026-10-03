import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-slate-900 text-white text-xs text-center py-2 font-medium">
        Frete grátis acima de R$ 199 · Parcele em até 6x sem juros
      </div>

      <nav className="bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link className="text-2xl font-black tracking-tighter text-slate-900" to="/">
            LOJA<span className="text-blue-600">.</span>
          </Link>

          <div className="flex gap-8">
            <Link className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors" to="/">Início</Link>
            <Link className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors" to="/catalogo">Catálogo</Link>
          </div>

          <Link className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors" to="/carrinho" aria-label="Carrinho">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </Link>
        </div>
      </nav>
    </header>
  );
}