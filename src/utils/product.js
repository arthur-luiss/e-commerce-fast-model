export const sameId = (a, b) => String(a) === String(b);

export const genderLabels = {
  feminino: 'Feminino',
  masculino: 'Masculino',
  unissex: 'Unissex',
  infantil: 'Infantil',
};

// Peça unissex vale para Feminino e Masculino, mas não para Infantil.
export const matchesGender = (product, gender) =>
  product.gender === gender || (product.gender === 'unissex' && gender !== 'infantil');

export const getCategories = (products) => [...new Set(products.map((p) => p.category))];

const sizeOrder = ['PP', 'P', 'M', 'G', 'GG', 'XG', '0-12M', '1-4', '5-8', '9-12'];

const sizeRank = (size) => {
  const index = sizeOrder.indexOf(size);
  if (index >= 0) return index;
  const n = Number(size);
  return Number.isFinite(n) ? 100 + n : 1000;
};

export const compareSizes = (a, b) => sizeRank(a) - sizeRank(b) || String(a).localeCompare(String(b));

export function getRelatedProducts(products, product, limit = 4) {
  const others = products.filter((p) => !sameId(p.id, product.id));
  const sameCategory = others.filter((p) => p.category === product.category);
  const sameGender = others.filter(
    (p) =>
      p.category !== product.category &&
      (product.gender === 'infantil' ? p.gender === 'infantil' : matchesGender(p, product.gender))
  );
  const rest = others.filter((p) => !sameCategory.includes(p) && !sameGender.includes(p));

  return [...sameCategory, ...sameGender, ...rest].slice(0, limit);
}