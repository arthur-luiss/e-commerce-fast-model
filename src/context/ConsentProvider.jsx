import { useMemo, useState } from 'react';
import { ConsentContext } from './consent-context';
import { brand } from '../config/brand';
import { createConsent, parseConsent } from '../utils/consent';

const STORAGE_KEY = `${brand.slug}:cookie-consent`;

function loadInitialState() {
  try {
    return parseConsent(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export default function ConsentProvider({ children }) {
  const [consent, setConsent] = useState(loadInitialState);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const value = useMemo(() => {
    const save = (choices) => {
      const next = createConsent(choices);
      setConsent(next);
      setPreferencesOpen(false);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // armazenamento indisponível: a escolha vale só até recarregar a página
      }
    };

    return {
      consent,
      // Use `allowed` para liberar scripts opcionais (ex.: análise) só com permissão
      allowed: {
        necessary: true,
        analytics: consent?.choices.analytics ?? false,
        marketing: consent?.choices.marketing ?? false,
      },
      acceptAll: () => save({ analytics: true, marketing: true }),
      rejectOptional: () => save({ analytics: false, marketing: false }),
      savePreferences: save,
      preferencesOpen,
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
    };
  }, [consent, preferencesOpen]);

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}