import { Link, NavLink, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import { pages, siteLinkGroups } from "../data/pages";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import NotFound from "./NotFound";
import { useConsent } from "../hooks/useConsent";

function FaqItem({ item }) {
  return (
    <details className="group border-b border-slate-200">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
        {item.q}
        <Icon
          name="chevron"
          className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="pb-5 text-sm leading-relaxed text-slate-600">
        <p>{item.a}</p>
        {item.link && (
          <Link
            to={item.link.to}
            className="mt-2 inline-block font-semibold text-slate-900 underline"
          >
            {item.link.label}
          </Link>
        )}
      </div>
    </details>
  );
}

function InfoContent({ page }) {
  useDocumentTitle(page.title);

  const { openPreferences } = useConsent();

  return (
    <div className="pb-20">
      <nav aria-label="Você está em" className="mb-6 text-xs text-slate-500">
        <Link to="/" className="hover:text-slate-900">
          Início
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">{page.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-4">
        <aside className="space-y-6 lg:col-span-1">
          {siteLinkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                {group.title}
              </h2>
              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-2 text-sm transition-colors ${
                          isActive
                            ? "bg-slate-900 font-semibold text-white"
                            : "text-slate-600 hover:bg-slate-100"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </aside>

        <article className="max-w-3xl lg:col-span-3">
          <h1 className="text-3xl font-bold tracking-tight">{page.title}</h1>
          {page.updatedAt && (
            <p className="mt-1 text-sm text-slate-400">
              Última atualização: {page.updatedAt}
            </p>
          )}
          {page.notice && (
            <p className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
              {page.notice}
            </p>
          )}

          {page.faq && (
            <div className="mt-6 border-t border-slate-200">
              {page.faq.map((item) => (
                <FaqItem key={item.q} item={item} />
              ))}
            </div>
          )}

          {page.sections?.map((section) => (
            <section key={section.heading} className="mt-8">
              <h2 className="text-lg font-bold">{section.heading}</h2>
              {section.paragraphs?.map((text) => (
                <p
                  key={text}
                  className="mt-3 text-sm leading-relaxed text-slate-600"
                >
                  {text}
                </p>
              ))}
              {section.list && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          {page.cookieButton && (
            <button
              type="button"
              onClick={openPreferences}
              className="mt-8 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-700"
            >
              Gerenciar preferências de cookies
            </button>
          )}
        </article>
      </div>
    </div>
  );
}

export default function InfoPage() {
  
  const { slug } = useParams();

  // hasOwn evita que endereços como "constructor" sejam tratados como página
  if (!Object.hasOwn(pages, slug)) return <NotFound />;

  return <InfoContent key={slug} page={pages[slug]} />;
}
