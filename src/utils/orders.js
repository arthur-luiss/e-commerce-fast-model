import { brand } from '../config/brand';

const STORAGE_KEY = `${brand.slug}:orders`;

function readOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveOrder(order) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([order, ...readOrders()].slice(0, 20)));
  } catch {
    // armazenamento indisponível: o pedido não poderá ser reaberto após recarregar
  }
}

export const getOrder = (id) => readOrders().find((o) => o.id === id) ?? null;

export const createOrderId = () =>
  `${String(Date.now()).slice(-8)}${Math.floor(10 + Math.random() * 90)}`;

// Códigos falsos, só para demonstração
export function createPaymentCode(method, id) {
  if (method === 'pix') return `PIX-SIMULADO-${id}`;
  if (method === 'boleto') return `00000.00000 00000.000000 00000.000000 0 ${id.padEnd(14, '0')}`;
  return null;
}