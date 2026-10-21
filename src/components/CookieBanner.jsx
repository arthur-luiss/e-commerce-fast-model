import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { cookieCategories } from '../config/cookies';
import { useConsent } from '../hooks/useConsent';

const solid = 'rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-700';
const outline =
  'rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold hover:border-slate-900';

function PreferencesDialog({ initial, onSave, onClose }) {
  const ref = useRef(null);
  const [choices, setChoices] = useState(initial);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal(); // foco preso, Esc e fundo escurecido vêm do navegador
  }, []);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()} // clique no fundo fecha
      aria-labelledby="cookie-dialog-title"
      className="m-auto w-11/12 max-w-lg rounded-2xl p-0 text-slate-900 backdrop:bg-black/50"
    >
      <div className="p-6">
        <h2 id="cookie-dialog-title" className="text-lg font-bold">
          Preferências de cookies
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Escolha quais cookies você permite. Você pode mudar isso quando quiser.{' '}
          <Link
            to="/institucional/politica-de-cookies"
            onClick={onClose}
            className="font-semibold text-slate-900 underline"
          >
            Política de Cookies
          </Link>
        </p>

        <ul className="mt-4 divide-y divide-slate-100">
          {cookieCategories.map((c) => (
            <li key={c.id} className="flex gap-4 py-4">
              <input
                id={`cookie-${c.id}`}
                type="checkbox"
                checked={c.required || Boolean(choices[c.id])}
                disabled={c.required}
                onChange={(e) => setChoices((s) => ({ ...s, [c.id]: e.target.checked }))}
                className="mt-1 h-5 w-5 shrink-0 accent-slate-900"
              />
              <label htmlFor={`cookie-${c.id}`}>
                <span className="block text-sm font-semibold">
                  {c.label}
                  {c.required && <span className="ml-2 text-xs font-normal text-slate-400">Sempre ativos</span>}
                </span>
                <span className="mt-1 block text-sm text-slate-600">{c.description}</span>
              </label>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button onClick={() => onSave(choices)} className={solid}>
            Salvar minhas escolhas
          </button>
          <button onClick={() => onSave({ analytics: true, marketing: true })} className={outline}>
            Aceitar todos
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default function CookieBanner() {
  const {
    consent,
    allowed,
    acceptAll,
    rejectOptional,
    preferencesOpen,
    openPreferences,
    closePreferences,
    savePreferences,
  } = useConsent();

  return (
    <>
      {!consent && (
        <div
          role="region"
          aria-label="Aviso de cookies"
          className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
        >
          <p className="text-sm font-semibold">Sua privacidade importa</p>
          <p className="mt-1 text-sm text-slate-600">
            Usamos cookies para o site funcionar, lembrar suas preferências e, com a sua permissão, entender como
            ele é usado. Saiba mais na{' '}
            <Link to="/institucional/politica-de-cookies" className="font-semibold text-slate-900 underline">
              Política de Cookies
            </Link>
            .
          </p>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button onClick={rejectOptional} className={solid}>
              Recusar opcionais
            </button>
            <button onClick={acceptAll} className={solid}>
              Aceitar todos
            </button>
            <button onClick={openPreferences} className={outline}>
              Personalizar
            </button>
          </div>
        </div>
      )}

      {preferencesOpen && (
        <PreferencesDialog
          initial={{ analytics: allowed.analytics, marketing: allowed.marketing }}
          onSave={savePreferences}
          onClose={closePreferences}
        />
      )}
    </>
  );
}