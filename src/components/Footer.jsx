import { Link } from 'react-router-dom';
import { brand } from '../config/brand';
import Logo from './Logo';

const { company } = brand;
const YEAR = new Date().getFullYear();

const columns = [
  {
    title: 'Comprar',
    links: [
      { label: 'Feminino', to: '/catalogo?genero=feminino' },
      { label: 'Masculino', to: '/catalogo?genero=masculino' },
      { label: 'Infantil', to: '/catalogo?genero=infantil' },
      { label: 'Esportivo', to: '/catalogo?esporte=1' },
      { label: 'Em promoção', to: '/catalogo?promocao=1' },
    ],
  },
  {
    title: 'Minha conta',
    links: [
      { label: 'Meus pedidos', to: '/pedidos' },
      { label: 'Favoritos', to: '/favoritos' },
      { label: 'Carrinho', to: '/carrinho' },
    ],
  },
];

const payments = ['Pix', 'Cartão de crédito', 'Boleto'];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50 text-sm text-slate-600">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-6">
        <div className="sm:col-span-2">
          <div className="text-slate-900">
            <Logo alwaysShowName />
          </div>
          <p className="mt-4 max-w-xs">{brand.tagline}</p>

          <p className="mt-6 text-xs font-bold uppercase tracking-wide text-slate-900">
            Formas de pagamento
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {payments.map((p) => (
              <li key={p} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs">
                {p}
              </li>
            ))}
          </ul>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wide text-slate-900">{col.title}</h2>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="transition-colors hover:text-slate-900 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {YEAR} {company.legalName} · CNPJ {company.cnpj} · {company.address}
          </p>
          <p>Loja fictícia criada para demonstração.</p>
        </div>
      </div>
    </footer>
  );
}