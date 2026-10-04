const img = (seed) => `https://picsum.photos/seed/${seed}/600/800`;

export const categories = ['Camisetas', 'Calças', 'Vestidos', 'Jaquetas', 'Acessórios'];

export const products = [
  { id: 1,  title: 'Camiseta Básica Algodão',      brand: 'Urban Basic', category: 'Camisetas',  gender: 'unissex',   price: 59.9,  oldPrice: 89.9,  image: img('camiseta1'),  sizes: ['P', 'M', 'G', 'GG'],    featured: true },
  { id: 2,  title: 'Camiseta Oversized Estampada', brand: 'Street Co.',  category: 'Camisetas',  gender: 'unissex',   price: 79.9,  oldPrice: null,  image: img('camiseta2'),  sizes: ['M', 'G', 'GG'],         featured: false },
  { id: 3,  title: 'Calça Jeans Slim',             brand: 'Denim Lab',   category: 'Calças',     gender: 'unissex',   price: 169.9, oldPrice: 229.9, image: img('calca1'),     sizes: ['38', '40', '42', '44'], featured: true },
  { id: 4,  title: 'Calça Alfaiataria Preta',      brand: 'Urban Basic', category: 'Calças',     gender: 'feminino',  price: 189.9, oldPrice: null,  image: img('calca2'),     sizes: ['P', 'M', 'G'],          featured: false },
  { id: 5,  title: 'Vestido Midi Floral',          brand: 'Bella Moda',  category: 'Vestidos',   gender: 'feminino',  price: 219.9, oldPrice: 299.9, image: img('vestido1'),   sizes: ['P', 'M', 'G'],          featured: true },
  { id: 6,  title: 'Vestido Curto Linho',          brand: 'Bella Moda',  category: 'Vestidos',   gender: 'feminino',  price: 149.9, oldPrice: null,  image: img('vestido2'),   sizes: ['P', 'M'],               featured: false },
  { id: 7,  title: 'Jaqueta Jeans Clássica',       brand: 'Denim Lab',   category: 'Jaquetas',   gender: 'unissex',   price: 259.9, oldPrice: 329.9, image: img('jaqueta1'),   sizes: ['M', 'G', 'GG'],         featured: true },
  { id: 8,  title: 'Jaqueta Corta-Vento',          brand: 'Street Co.',  category: 'Jaquetas',   gender: 'masculino', price: 199.9, oldPrice: null,  image: img('jaqueta2'),   sizes: ['P', 'M', 'G', 'GG'],    featured: false },
  { id: 9,  title: 'Boné Dad Hat',                 brand: 'Street Co.',  category: 'Acessórios', gender: 'unissex',   price: 49.9,  oldPrice: 69.9,  image: img('acessorio1'), sizes: ['Único'],                featured: false },
  { id: 10, title: 'Cinto de Couro',               brand: 'Urban Basic', category: 'Acessórios', gender: 'masculino', price: 89.9,  oldPrice: null,  image: img('acessorio2'), sizes: ['90', '100', '110'],     featured: false },
  { id: 11, title: 'Camisa Social Slim',           brand: 'Urban Basic', category: 'Camisetas',  gender: 'masculino', price: 129.9, oldPrice: 169.9, image: img('camisa1'),    sizes: ['P', 'M', 'G'],          featured: true },
  { id: 12, title: 'Calça Jogger Moletom',         brand: 'Street Co.',  category: 'Calças',     gender: 'unissex',   price: 119.9, oldPrice: null,  image: img('calca3'),     sizes: ['P', 'M', 'G', 'GG'],    featured: false },
];

export const getProductById = (id) => products.find((p) => p.id === Number(id));