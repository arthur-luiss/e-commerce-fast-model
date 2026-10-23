export const STEP_MS = 60 * 1000; // demonstração: 1 minuto por etapa

export const steps = [
  { id: 'received', label: 'Pedido recebido' },
  { id: 'paid', label: 'Pagamento confirmado' },
  { id: 'picking', label: 'Em separação' },
  { id: 'shipped', label: 'Enviado' },
  { id: 'delivered', label: 'Entregue' },
];

export const getPaidAt = (order) =>
  order.payment.method === 'card' ? order.createdAt : (order.paidAt ?? null);

// Índice da etapa atual (0 = recebido ... 4 = entregue)
export function getStepIndex(order, now) {
  const paidAt = getPaidAt(order);
  if (!paidAt) return 0;
  return Math.min(steps.length - 1, 1 + Math.floor(Math.max(0, now - paidAt) / STEP_MS));
}

// Momento em que a etapa foi (ou será) concluída; null se o pedido ainda não foi pago
export function getStepTime(order, index) {
  if (index === 0) return order.createdAt;
  const paidAt = getPaidAt(order);
  return paidAt ? paidAt + (index - 1) * STEP_MS : null;
}

export function getStatus(order, now) {
  if (!getPaidAt(order)) return { label: 'Aguardando pagamento', tone: 'amber' };
  const index = getStepIndex(order, now);
  return { label: steps[index].label, tone: index === steps.length - 1 ? 'green' : 'slate' };
}