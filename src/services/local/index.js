import { products, orders, reviews, messages } from './local';

// Único ponto de troca: quando o banco de dados existir, importe de './api' em vez de './local'.
export const services = { products, orders, reviews, messages };

// TEMPORÁRIO (remover no passo do painel): permite testar no console, ex.:
// services.orders.updateStatus('NUMERO_DO_PEDIDO', 'paid')
if (import.meta.env.DEV) window.services = services;