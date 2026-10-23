const BASE_DATE = Date.UTC(2026, 8, 1); // data fixa, para as avaliações não mudarem a cada visita
const DAY = 24 * 60 * 60 * 1000;

const names = [
  'Ana', 'Bruno', 'Camila', 'Diego', 'Fernanda', 'Gustavo', 'Helena', 'Igor',
  'Juliana', 'Lucas', 'Mariana', 'Rafael', 'Sofia', 'Thiago', 'Vitória',
];
const initials = ['A', 'B', 'C', 'D', 'F', 'G', 'L', 'M', 'P', 'R', 'S', 'T'];

const comments = {
  5: [
    'Amei! Qualidade excelente e chegou antes do prazo.',
    'Caimento perfeito, super recomendo.',
    'Tecido macio e acabamento impecável. Vale cada centavo.',
    'Superou as expectativas, já quero comprar em outras cores.',
    'Lindo demais, igualzinho às fotos.',
  ],
  4: [
    'Muito bom, só achei o tecido um pouco fino.',
    'Gostei bastante, chegou bem embalado.',
    'Boa compra, o tamanho veio certinho.',
    'Bonito e confortável. Só demorou um pouco para chegar.',
  ],
  3: [
    'É razoável pelo preço, esperava um acabamento melhor.',
    'A cor é um pouco diferente da foto, mas serve.',
    'O tamanho veio meio justo, sugiro pedir um acima.',
  ],
  2: [
    'O tecido não é tão bom quanto eu imaginava.',
    'Veio com uma linha solta, mas o atendimento ajudou.',
  ],
  1: ['Não gostei, o tamanho não corresponde à tabela.'],
};

// Gerador pseudoaleatório com semente: o mesmo produto sempre gera as mesmas avaliações
function mulberry32(seed) {
  let s = seed;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = (list, rand) => list[Math.floor(rand() * list.length)];

function pickRating(rand) {
  const r = rand();
  if (r < 0.5) return 5;
  if (r < 0.78) return 4;
  if (r < 0.9) return 3;
  if (r < 0.96) return 2;
  return 1;
}

function generate(productId) {
  const rand = mulberry32(productId * 7919);
  const count = 4 + Math.floor(rand() * 10);

  return Array.from({ length: count }, (_, i) => {
    const rating = pickRating(rand);
    return {
      id: `m-${productId}-${i}`,
      productId,
      rating,
      name: `${pick(names, rand)} ${pick(initials, rand)}.`,
      comment: pick(comments[rating], rand),
      createdAt: BASE_DATE - Math.floor(rand() * 180) * DAY,
      verified: rand() < 0.8,
      mock: true,
    };
  });
}

const cache = new Map();

export function getMockReviews(productId) {
  if (!cache.has(productId)) cache.set(productId, generate(productId));
  return cache.get(productId);
}