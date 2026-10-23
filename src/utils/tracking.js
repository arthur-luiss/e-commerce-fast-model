export const STATUS_FLOW = ['pending', 'paid', 'preparing', 'shipped', 'delivered'];
export const ORDER_STATUSES = [...STATUS_FLOW, 'cancelled'];

export const statusLabels = {
  pending: 'Aguardando pagamento',
  paid: 'Pagamento confirmado',
  preparing: 'Em separação',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
};

// A primeira etapa da linha do tempo é "Pedido recebido", que corresponde ao status inicial "pending"
export const steps = STATUS_FLOW.map((status) => ({
  status,
  label: status === 'pending' ? 'Pedido recebido' : statusLabels[status],
}));

export const getStepIndex = (order) => Math.max(0, STATUS_FLOW.indexOf(order.status));

// Momento em que o pedido entrou nesse status; null se ainda não aconteceu
export function getStepTime(order, status) {
  const entry = [...(order.history ?? [])].reverse().find((h) => h.status === status);
  return entry ? entry.at : null;
}

const tones = { pending: 'amber', delivered: 'green', cancelled: 'red' };

export const getStatus = (order) => ({
  label: statusLabels[order.status] ?? order.status,
  tone: tones[order.status] ?? 'slate',
});