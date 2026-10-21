export const CONSENT_VERSION = 1; // aumente quando a política de cookies mudar, para pedir a escolha de novo
export const CONSENT_MAX_AGE = 365 * 24 * 60 * 60 * 1000; // renova o pedido a cada 12 meses

// Lê o consentimento salvo. Devolve null se não existir, estiver inválido,
// for de uma versão antiga da política ou tiver mais de 12 meses.
export function parseConsent(raw, now = Date.now()) {
  try {
    const c = JSON.parse(raw ?? 'null');
    const valid =
      c &&
      c.version === CONSENT_VERSION &&
      typeof c.date === 'number' &&
      c.choices &&
      typeof c.choices.analytics === 'boolean' &&
      typeof c.choices.marketing === 'boolean';
    if (!valid) return null;

    const age = now - c.date;
    return age >= 0 && age < CONSENT_MAX_AGE ? c : null;
  } catch {
    return null;
  }
}

export const createConsent = (choices, now = Date.now()) => ({
  version: CONSENT_VERSION,
  date: now,
  choices: {
    analytics: choices.analytics === true,
    marketing: choices.marketing === true,
  },
});