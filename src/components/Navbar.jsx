import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import Icon from './Icon';

const navItems = ['Clube', 'Feminino', 'Masculino', 'Infantil', 'Esportivo', 'Marcas', 'Outlet'];

export default function Navbar({ overHero = false }) {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(() => window.scrollY > 10);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const transparent = overHero && !scrolled;

  const headerStyle = transparent
    ? 'bg-transparent text-white hover:bg-white hover:text-slate-900'
    : 'bg-white text-slate-900 shadow-sm';
  const dividerStyle = transparent
    ? 'border-transparent group-hover:border-slate-200'
    : 'border-slate-200';

  const handleSearch = (e) => {
    e.preventDefault();
    const term = query.trim();
    navigate(term ? `/catalogo?busca=${encodeURIComponent(term)}` : '/catalogo');
  };

  return (
    <header
      className={`group fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${headerStyle}`}
    >
      {/* Linha 1: logo, busca e ações */}
      <div className="mx-auto flex h-92px max-w-1400px items-center gap-4 px-4 md:gap-10">
        <Link
          to="/"
          className="shrink-0 rounded-full bg-black px-5 py-2 text-2xl font-medium lowercase tracking-tight text-white md:text-3xl"
        >
          loja<span className="ml-0.5 text-lg">•</span>
        </Link>

        <form
          onSubmit={handleSearch}
          className="flex max-w-867px flex-1 items-center rounded-full bg-[#f4f4f4] text-slate-800"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="O que você procura?"
            className="w-full bg-transparent px-5 py-3 text-sm outline-none placeholder:text-slate-500"
          />
          <button
            type="submit"
            aria-label="Buscar"
            className="my-2 border-l border-slate-300 px-4 text-slate-600 hover:text-blue-600"
          >
            <Icon name="search" className="h-5 w-5" />
          </button>
        </form>

        <div className="ml-auto flex items-center gap-5">
          <Link to="/" className="hidden text-sm font-medium hover:text-blue-600 md:block">
            Entrar
          </Link>
          <button aria-label="Cupons" className="hidden hover:text-blue-600 md:block">
            <Icon name="ticket" />
          </button>
          <button aria-label="Favoritos" className="hover:text-blue-600">
            <Icon name="heart" />
          </button>
          <Link to="/carrinho" aria-label="Carrinho" className="relative hover:text-blue-600">
            <Icon name="bag" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[11px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Linha 2: categorias (só em telas médias para cima) */}
      <nav className={`hidden border-t transition-colors duration-300 md:block ${dividerStyle}`}>
        <ul className="mx-auto flex h-42px max-w-1400px items-center justify-between px-4">
          {navItems.map((item) => (
            // TODO: apontar cada seção para um filtro real quando o catálogo tiver gênero/outlet
            <li key={item}>
              <Link
                to="/catalogo"
                className="text-[15px] font-normal uppercase tracking-wide transition-colors hover:text-blue-600"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}