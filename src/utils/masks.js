export const onlyDigits = (v) => v.replace(/\D/g, '');

export const maskCPF = (v) =>
  onlyDigits(v)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

export const maskPhone = (v) => {
  const d = onlyDigits(v).slice(0, 11);
  const base = d.replace(/(\d{2})(\d)/, '($1) $2');
  return d.length <= 10 ? base.replace(/(\d{4})(\d)/, '$1-$2') : base.replace(/(\d{5})(\d)/, '$1-$2');
};

export const maskCEP = (v) => onlyDigits(v).slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2');

export const maskCardNumber = (v) => onlyDigits(v).slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');

export const maskExpiry = (v) => {
  const d = onlyDigits(v).slice(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};