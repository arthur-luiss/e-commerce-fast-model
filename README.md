# Trama

Front-end de um e-commerce de moda feminina, masculina e infantil, inspirado na experiência de grandes varejistas online. Projeto em desenvolvimento.

**Demonstração:** https://model-kappa-five.vercel.app/

> Os dados são simulados (mock). Não há back-end nem pagamento real.

## Funcionalidades

- **Home** com banner de coleção, barra de benefícios e destaques
- **Cabeçalho** que fica transparente sobre o banner e vira branco ao passar o mouse ou rolar a página
- **Mega menu** (Feminino, Masculino, Infantil, Esportivo e Marcas) gerado a partir dos produtos, sem links para páginas vazias
- **Menu lateral no mobile**, em acordeão, com os mesmos menus
- **Catálogo** com busca, filtros por URL e ordenação por preço
- **Página de produto** com galeria de fotos, seleção de tamanho, detalhes e produtos relacionados
- **Carrinho** com quantidade, frete grátis acima de R$ 199 e resumo do pedido, salvo no navegador
- **Favoritos** com contador no cabeçalho, salvos no navegador

## Tecnologias

- [React](https://react.dev/) com [Vite](https://vite.dev/)
- [React Router 7](https://reactrouter.com/)
- [Tailwind CSS 4](https://tailwindcss.com/) (via `@tailwindcss/postcss`)
- Estado global com Context API (carrinho e favoritos)

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org/) instalado.

```bash
git clone https://github.com/arthur-luiss/e-commerce-fast-model.git
cd e-commerce-fast-model
npm install
npm run dev
```

O projeto abre em `http://localhost:5173`.

| Comando           | O que faz                          |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento        |
| `npm run build`   | Gera a versão de produção (`dist`) |
| `npm run preview` | Testa a versão de produção         |
| `npm run lint`    | Verifica o código com o ESLint     |

## Rotas

| Rota            | Página                  |
| --------------- | ----------------------- |
| `/`             | Home                    |
| `/catalogo`     | Catálogo com filtros    |
| `/produto/:id`  | Detalhes do produto     |
| `/carrinho`     | Carrinho de compras     |
| `/favoritos`    | Lista de favoritos      |
| `/checkout`     | Finalização da compra   |
| `/pedido/:id`   | Confirmação do pedido   |

## Filtros do catálogo

Os filtros ficam na URL, então qualquer busca pode ser compartilhada ou recarregada.

| Parâmetro   | Exemplo                       | Descrição                                   |
| ----------- | ----------------------------- | ------------------------------------------- |
| `genero`    | `?genero=feminino`            | `feminino`, `masculino` ou `infantil`       |
| `publico`   | `?genero=infantil&publico=menina` | `bebe`, `menina` ou `menino`            |
| `categoria` | `?categoria=Calças`           | Categoria do produto                        |
| `marca`     | `?marca=Denim Lab`            | Marca do produto                            |
| `tamanho`   | `?tamanho=M`                  | Tamanho disponível                          |
| `esporte`   | `?esporte=1`                  | Apenas peças esportivas                     |
| `promocao`  | `?promocao=1`                 | Apenas produtos com desconto                |
| `busca`     | `?busca=jeans`                | Texto digitado na barra de busca            |

Os parâmetros podem ser combinados: `/catalogo?genero=feminino&categoria=Vestidos&tamanho=M`.

## Estrutura

```
src/
├── components/   Navbar, MegaMenu, MobileMenu, Hero, BenefitsBar, ProductCard, Icon
├── config/       brand.js (nome e slogan da loja)
├── context/      Providers de carrinho e favoritos
├── data/         products.js (mock) e menu.js (menus gerados dos produtos)
├── hooks/        useCart e useFavorites
├── pages/        Home, Catalog, ProductDetails, Cart, Favorites
├── utils/        formatação de moeda e funções de produto
├── App.jsx       Rotas e layout
└── main.jsx
```

## Dados

Os produtos ficam em `src/data/products.js`. Cada item tem este formato:

```js
{
  id: 1,
  title: 'Camiseta Básica Algodão',
  brand: 'Urban Basic',
  category: 'Camisetas',
  gender: 'unissex',          // feminino | masculino | unissex | infantil
  kids: 'menino',             // opcional: bebe | menina | menino
  sport: true,                // opcional: peça esportiva
  price: 59.9,
  oldPrice: 89.9,             // opcional: preço antigo (gera selo de desconto)
  image: '...',
  sizes: ['P', 'M', 'G'],
  featured: true,             // aparece nos destaques da Home
}
```

Os menus (`src/data/menu.js`) leem esses produtos: uma categoria ou marca só aparece no menu se existir pelo menos um produto dela.

As imagens são placeholders do [Picsum](https://picsum.photos/). Para usar fotos reais, coloque-as em `public/products/` e atualize o campo `image`.

## Trocar o nome da loja

O nome fica em `src/config/brand.js`. Altere `name` e `slug`, atualize o título em `index.html` e o ícone em `public/favicon-botao.svg`. A logo é o componente `src/components/Logo.jsx`.

## Deploy

O projeto está publicado na [Vercel](https://vercel.com/). Como é uma aplicação de página única, o arquivo `vercel.json` redireciona todas as rotas para o `index.html`, evitando erro 404 ao recarregar páginas como `/catalogo`.

## Próximos passos

- [ ] Checkout (dados, endereço e pagamento simulados)
- [ ] Avaliações de produtos
- [ ] Tabela de medidas e cálculo de frete por CEP
- [ ] Fotos e descrições reais dos produtos
- [ ] Back-end e autenticação