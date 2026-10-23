import { Link } from "react-router-dom";

export default function MegaMenu({ menu, onClose }) {
  return (
    <div className="absolute inset-x-0 top-full border-t border-slate-200 bg-white text-slate-900 shadow-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-10 px-6 py-8 lg:grid-cols-5">
        {menu.columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">
              {col.title}
            </h3>

            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    onClick={onClose}
                    className="text-sm text-slate-600 transition-colors hover:text-slate-900 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {col.seeAll && (
              <Link
                to={col.seeAll}
                onClick={onClose}
                className="mt-5 inline-block text-sm font-bold hover:underline"
              >
                Ver tudo
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
