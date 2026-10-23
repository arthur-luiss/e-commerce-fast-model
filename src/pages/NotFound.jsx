import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogoMark } from '../components/Logo';
import { useProducts } from '../hooks/useProducts'
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFound(){
  useDocumentTitle('Página não encontrada');
  const { categories } = useProducts();
  

  // A hospedagem responde "200 OK" para qualquer endereço; isto pede aos buscadores que não indexem a página
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <div className="py-16 text-center">
      <div
        aria-hidden="true"
        className="flex items-center justify-center gap-2 text-8xl font-black tracking-tighter text-slate-900"
      >
        4<LogoMark className="h-20 w-20" />4
      </div>

      <h1 className="mt-6 text-3xl font-bold tracking-tight">Página não encontrada</h1>
      <p className="mt-1 text-sm text-slate-400">Erro 404</p>
      <p className="mx-auto mt-4 max-w-md text-slate-500">
        O endereço pode ter mudado ou nunca ter existido. Que tal continuar por um destes caminhos?
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-full bg-slate-900 px-8 py-3 text-sm font-bold text-white hover:bg-slate-700"
        >
          Ir para o início
        </Link>
        <Link
          to="/catalogo"
          className="rounded-full border border-slate-300 px-8 py-3 text-sm font-semibold hover:border-slate-900"
        >
          Ver catálogo
        </Link>
      </div>

      {categories.length > 0 && (
        <div className="mt-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Ou vá direto para</p>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/catalogo?categoria=${encodeURIComponent(cat)}`}
                className="rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-600 hover:border-slate-900 hover:text-slate-900"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}