export const FREE_SHIPPING_MIN = 199;
export const SHIPPING_FEE = 19.9;

export const getShipping = (subtotal) => (subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE);