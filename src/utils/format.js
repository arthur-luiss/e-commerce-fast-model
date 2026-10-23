export const formatBRL = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const getDiscount = (price, oldPrice) =>
  oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;