import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { menus } from '../data/menu';
import Icon from './Icon';
import MegaMenu from './MegaMenu';

const navItems = ['Clube', 'Feminino', 'Masculino', 'Infantil', 'Esportivo', 'Marcas', 'Outlet'];

export default function Navbar({ overHero = false }) {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 10);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setActiveMenu(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const transparent = overHero && !scrolled && !activeMenu;

  const headerStyle = transparent
    ? 'border-transparent bg-transparent text-white hover:border-slate-200 hover:bg-white hover:text-slate-900'
    : 'border-slate-200 bg-white text-slate-900';

  const handleSearch = (e) => {
    e.preventDefault();
    const term = query.trim();
    navigate(term ? `/catalogo?busca=${encodeURIComponent(term)}` : '/catalogo');
  };

  return (
    <header
      onMouseLeave={() => setActiveMenu(null)}
      className={`${overHero ? 'fixed' : 'sticky'} inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${headerStyle}`}
    >
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-6 md:grid-cols-[1fr_minmax(0,42rem)_1fr] md:gap-10">
        <Link
          to="/"
          className="shrink-0 justify-self-start rounded-full bg-black px-4 py-1.5 text-xl font-medium lowercase tracking-tight text-white"
        >
          loja<span className="ml-0.5 text-sm">•</span>
        </Link>

        <form
          onSubmit={handleSearch}
          className="flex w-full items-center rounded-full bg-slate-100 text-slate-800"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="O que você procura?"
            className="w-full bg-transparent px-5 py-2.5 text-sm outline-none placeholder:text-slate-500"
          />
          <button type="submit" aria-label="Buscar" className="px-4 text-slate-500 hover:text-slate-900">
            <Icon name="search" className="h-5 w-5" />
          </button>
        </form>

        <div className="flex items-center justify-end gap-5">
          <Link to="/" className="hidden text-sm font-medium md:block">
            Entrar
          </Link>
          <button aria-label="Favoritos" className="opacity-90 hover:opacity-100">
            <Icon name="heart" className="h-5 w-5" />
          </button>
          <Link to="/carrinho" aria-label="Carrinho" className="relative opacity-90 hover:opacity-100">
            <Icon name="bag" className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav className="hidden md:block">
        <ul className="mx-auto flex h-10 max-w-7xl items-center justify-center gap-12 px-6">
          {navItems.map((item) => {
            const menu = menus[item];
            const isActive = activeMenu === item;
            const dimmed = activeMenu && !isActive;

            return (
              <li
                key={item}
                onMouseEnter={() => setActiveMenu(menu ? item : null)}
                onFocus={() => setActiveMenu(menu ? item : null)}
              >
                <Link
                  to={menu?.to ?? '/catalogo'}
                  className={`text-[13px] uppercase tracking-wider transition-all ${
                    isActive
                      ? 'font-bold underline underline-offset-8'
                      : `font-medium ${dimmed ? 'opacity-40' : 'opacity-80 hover:opacity-100'}`
                  }`}
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {activeMenu && (
        <>
          {/* Escurece a página abaixo do menu */}
          <div className="pointer-events-none absolute inset-x-0 top-full h-screen bg-black/50" />
          <MegaMenu menu={menus[activeMenu]} onClose={() => setActiveMenu(null)} />
        </>
      )}
    </header>
  );
}