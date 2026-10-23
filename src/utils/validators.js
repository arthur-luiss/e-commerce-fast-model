import { onlyDigits } from './masks';

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export function isCPF(value) {
  const cpf = onlyDigits(value);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const check = (length) => {
    let sum = 0;
    for (let i = 0; i < length; i++) sum += Number(cpf[i]) * (length + 1 - i);
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return check(9) === Number(cpf[9]) && check(10) === Number(cpf[10]);
}

export function isPhone(value) {
  const d = onlyDigits(value);
  return d.length === 10 || (d.length === 11 && d[2] === '9');
}

// Algoritmo de Luhn: detecta número de cartão digitado errado
export function isCardNumber(value) {
  const d = onlyDigits(value);
  if (d.length < 13 || d.length > 16) return false;

  let sum = 0;
  let double = false;
  for (let i = d.length - 1; i >= 0; i--) {
    let n = Number(d[i]);
    if (double) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    double = !double;
  }
  return sum % 10 === 0;
}

export function isExpiry(value, now = new Date()) {
  const match = /^(\d{2})\/(\d{2})$/.exec(value);
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return false;
  // vale até o último dia do mês de validade
  return new Date(year, month, 0, 23, 59, 59) >= now;
}

export function validateCheckout(f) {
  const errors = {};

  if (f.name.trim().split(/\s+/).filter(Boolean).length < 2) errors.name = 'Informe nome e sobrenome.';
  if (!isEmail(f.email)) errors.email = 'Informe um e-mail válido.';
  if (!isCPF(f.cpf)) errors.cpf = 'CPF inválido.';
  if (!isPhone(f.phone)) errors.phone = 'Informe um telefone com DDD.';

  if (onlyDigits(f.cep).length !== 8) errors.cep = 'CEP inválido.';
  if (!f.street.trim()) errors.street = 'Informe a rua.';
  if (!f.number.trim()) errors.number = 'Informe o número.';
  if (!f.neighborhood.trim()) errors.neighborhood = 'Informe o bairro.';
  if (!f.city.trim()) errors.city = 'Informe a cidade.';
  if (!/^[A-Za-z]{2}$/.test(f.state)) errors.state = 'UF inválida.';

  if (f.method === 'card') {
    if (!isCardNumber(f.cardNumber)) errors.cardNumber = 'Número de cartão inválido.';
    if (f.cardName.trim().length < 3) errors.cardName = 'Informe o nome como está no cartão.';
    if (!isExpiry(f.cardExpiry)) errors.cardExpiry = 'Validade inválida ou vencida.';
    if (!/^\d{3,4}$/.test(f.cardCvv)) errors.cardCvv = 'CVV inválido.';
  }

  return errors;
}