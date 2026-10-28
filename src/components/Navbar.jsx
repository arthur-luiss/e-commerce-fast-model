import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import Icon from "./Icon";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import { useProducts } from "../hooks/useProducts";
import { useAuth } from "../hooks/useAuth";

export default function Navbar({ overHero = false }) {
  const { totalItems } = useCart();
  const { count: favoritesCount } = useFavorites();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 10);
  const { menus } = useProducts();
  const { user, isAuthenticated, logout } = useAuth();
  const navItems = Object.keys(menus);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setActiveMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const transparent = overHero && !scrolled && !activeMenu;

  const headerStyle = transparent
    ? "border-transparent bg-transparent text-white hover:border-slate-200 hover:bg-white hover:text-slate-900"
    : "border-slate-200 bg-white text-slate-900";

  const handleSearch = (e) => {
    e.preventDefault();
    const term = query.trim();
    navigate(
      term ? `/catalogo?busca=${encodeURIComponent(term)}` : "/catalogo",
    );
  };

  const handleLogout = () => {
    logout();
    window.location.assign("/");
  };

  const firstName = user?.name?.trim().split(/\s+/)[0] || "Minha conta";
  const initials = user?.name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const badge =
    "absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-bold text-white ring-2 ring-white";

  return (
    <>
      <header
        onMouseLeave={() => setActiveMenu(null)}
        className={`${overHero ? "fixed" : "sticky"} inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${headerStyle}`}
      >
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-6 md:grid-cols-[1fr_minmax(0,42rem)_1fr] md:gap-10">
          <div className="flex items-center gap-3 justify-self-start">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu"
              className="-ml-1 p-1 md:hidden"
            >
              <Icon name="menu" className="h-6 w-6" />
            </button>

            <Logo className="shrink-0" />
          </div>

          <form
            onSubmit={handleSearch}
            className="flex w-full items-center rounded-full bg-slate-100 text-slate-800"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="O que você procura?"
              className="w-full min-w-0 bg-transparent px-5 py-2.5 text-sm outline-none placeholder:text-slate-500"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="px-4 text-slate-500 hover:text-slate-900"
            >
              <Icon name="search" className="h-5 w-5" />
            </button>
          </form>

          <div className="flex items-center justify-end gap-5">
            {isAuthenticated ? (
              <div className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => setProfileOpen((open) => !open)}
                  aria-expanded={profileOpen}
                  aria-haspopup="menu"
                  className="flex cursor-pointer items-center gap-2 text-sm font-medium"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                    {initials}
                  </span>
                  <span className="max-w-24 truncate">{firstName}</span>
                </button>
                {profileOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-3 w-48 rounded-xl border border-slate-200 bg-white p-2 text-slate-900 shadow-lg"
                  >
                    <Link
                      to="/dashboard"
                      role="menuitem"
                      onClick={() => setProfileOpen(false)}
                      className="block cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-slate-100"
                    >
                      Meu painel
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hidden text-sm font-medium md:block">
                Entrar
              </Link>
            )}
            <Link
              to="/pedidos"
              aria-label="Meus pedidos"
              className="hidden opacity-90 hover:opacity-100 md:block"
            >
              <Icon name="orders" className="h-5 w-5" />
            </Link>
            <Link
              to="/favoritos"
              aria-label="Favoritos"
              className="relative opacity-90 hover:opacity-100"
            >
              <Icon name="heart" className="h-5 w-5" />
              {isAuthenticated && favoritesCount > 0 && (
                <span className={badge}>{favoritesCount}</span>
              )}
            </Link>
            <Link
              to="/carrinho"
              aria-label="Carrinho"
              className="relative opacity-90 hover:opacity-100"
            >
              <Icon name="bag" className="h-5 w-5" />
              {isAuthenticated && totalItems > 0 && (
                <span className={badge}>{totalItems}</span>
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
                  onMouseEnter={() => setActiveMenu(item)}
                  onFocus={() => setActiveMenu(item)}
                >
                  <Link
                    to={menu.to}
                    className={`text-[13px] uppercase tracking-wider transition-all ${
                      isActive
                        ? "font-bold underline underline-offset-8"
                        : `font-medium ${dimmed ? "opacity-40" : "opacity-80 hover:opacity-100"}`
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
            <div className="pointer-events-none absolute inset-x-0 top-full h-screen bg-black/50" />
            <MegaMenu
              menu={menus[activeMenu]}
              onClose={() => setActiveMenu(null)}
            />
          </>
        )}
      </header>

      <MobileMenu open={mobileOpen} onClose={closeMobile} />
    </>
  );
}
