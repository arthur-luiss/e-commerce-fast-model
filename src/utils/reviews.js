export const MAX_COMMENT = 500;
export const MAX_NAME = 40;

export const formatRating = (n) => n.toFixed(1).replace('.', ',');

export function summarize(reviews) {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sum = 0;

  for (const r of reviews) {
    distribution[r.rating] += 1;
    sum += r.rating;
  }

  const count = reviews.length;
  return { count, average: count ? sum / count : 0, distribution };
}

export function validateReview({ rating, name, comment }) {
  const errors = {};
  if (!rating) errors.rating = 'Escolha uma nota de 1 a 5.';
  if (name.trim().length < 2) errors.name = 'Informe seu nome.';
  if (comment.trim().length < 10) errors.comment = 'Escreva pelo menos 10 caracteres.';
  else if (comment.trim().length > MAX_COMMENT) errors.comment = `Use no máximo ${MAX_COMMENT} caracteres.`;
  return errors;
}