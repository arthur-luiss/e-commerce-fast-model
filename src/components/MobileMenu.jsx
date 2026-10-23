import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from '../hooks/useProducts';
import Icon from "./Icon";

export default function MobileMenu({ open, onClose }) {
  const [openSection, setOpenSection] = useState(null);
  const { menus } = useProducts();

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-60 md:hidden ${open ? "" : "pointer-events-none"}`}
    >
      {/* Fundo escuro */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Gaveta */}
      <aside
        aria-hidden={!open}
        className={`absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-white text-slate-900 shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-6">
          <span className="text-sm font-bold uppercase tracking-wide">
            Menu
          </span>
          <button onClick={onClose} aria-label="Fechar menu" className="p-1">
            <Icon name="close" className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          {Object.entries(menus).map(([name, menu]) => {
            const isOpen = openSection === name;

            return (
              <div key={name} className="border-b border-slate-100">
                <button
                  onClick={() => setOpenSection(isOpen ? null : name)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide"
                >
                  {name}
                  <Icon
                    name="chevron"
                    className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="space-y-6 bg-slate-50 px-6 pb-6 pt-2">
                    <Link
                      to={menu.to}
                      onClick={onClose}
                      className="inline-block text-sm font-bold underline underline-offset-4"
                    >
                      Ver tudo em {name}
                    </Link>

                    {menu.columns.map((col) => (
                      <div key={col.title}>
                        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                          {col.title}
                        </h3>

                        <ul className="space-y-2.5">
                          {col.links.map((link) => (
                            <li key={link.label}>
                              <Link
                                to={link.to}
                                onClick={onClose}
                                className="text-sm text-slate-700"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>

                        {col.sizes && (
                          <div className="mt-4">
                            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                              Tamanhos
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {col.sizes.map((size) => (
                                <Link
                                  key={size.label}
                                  to={size.to}
                                  onClick={onClose}
                                  className="flex h-10 min-w-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-xs font-medium"
                                >
                                  {size.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="shrink-0 space-y-3 border-t border-slate-200 px-6 py-4 text-sm font-medium">
          <Link to="/pedidos" onClick={onClose} className="block">
            Meus pedidos
          </Link>
          <Link to="/favoritos" onClick={onClose} className="block">
            Favoritos
          </Link>
        </div>
      </aside>
    </div>
  );
}
