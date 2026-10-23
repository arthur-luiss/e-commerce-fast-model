import { products, matchesGender } from '../data/products';

export const genderLabels = {
  feminino: 'Feminino',
  masculino: 'Masculino',
  unissex: 'Unissex',
  infantil: 'Infantil',
};

// Texto provisório gerado a partir dos dados do mock.
export function getDescription(product) {
  const { title, brand, category, gender } = product;
  return `${title} da ${brand}, da linha ${genderLabels[gender].toLowerCase()}. Uma peça de ${category.toLowerCase()} pensada para o dia a dia, com caimento confortável e fácil de combinar com o resto do guarda-roupa.`;
}

export function getRelatedProducts(product, limit = 4) {
  const others = products.filter((p) => p.id !== product.id);
  const sameCategory = others.filter((p) => p.category === product.category);
  const sameGender = others.filter(
    (p) =>
      p.category !== product.category &&
      (product.gender === 'infantil' ? p.gender === 'infantil' : matchesGender(p, product.gender))
  );
  const rest = others.filter((p) => !sameCategory.includes(p) && !sameGender.includes(p));

  return [...sameCategory, ...sameGender, ...rest].slice(0, limit);
}