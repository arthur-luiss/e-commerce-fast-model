import { brand } from '../../config/brand';

// Chaves próprias ("trama:local:..."): os dados de teste antigos ficam de fora.
const prefix = `${brand.slug}:local:`;
const memory = {};

export function read(name, fallback) {
  try {
    const raw = localStorage.getItem(prefix + name);
    if (raw) return JSON.parse(raw);
  } catch {
    // armazenamento indisponível ou corrompido: usa a memória
  }
  return name in memory ? memory[name] : fallback;
}

export function write(name, value) {
  memory[name] = value;
  try {
    localStorage.setItem(prefix + name, JSON.stringify(value));
  } catch {
    // sem armazenamento: os dados valem só até recarregar a página
  }
}

export const createId = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`.toUpperCase();