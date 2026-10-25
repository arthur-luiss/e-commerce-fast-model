const gallery = (image, photoIds) => [
  image,
  ...photoIds.map(
    (photoId) =>
      `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=600&h=800&q=80`,
  ),
];

export const categories = [
  "Camisetas",
  "Calças",
  "Shorts",
  "Vestidos",
  "Jaquetas",
  "Conjuntos",
  "Acessórios",
];

const rawProducts = [
  {
    id: 1,
    title: "Camiseta Básica Algodão",
    brand: "Urban Basic",
    category: "Camisetas",
    gender: "masculino",
    price: 59.9,
    oldPrice: 89.9,
    image:
      "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1627225924765-552d49cf47ad",
        "photo-1592994238317-fcf75c5466fd",
        "photo-1534008757030-27299c4371b6",
      ],
    ),
    sizes: ["P", "M", "G", "GG"],
    featured: true,
  },
  {
    id: 2,
    title: "Camiseta Oversized Estampada",
    brand: "Street Co.",
    category: "Camisetas",
    gender: "masculino",
    price: 79.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1594587895869-d90d9ab289f1?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1594587895869-d90d9ab289f1?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1661110546797-d86cc72a2765",
        "photo-1621446511130-0ed6519bfeb6",
        "photo-1593278641722-49b1047ede21",
      ],
    ),
    sizes: ["M", "G", "GG"],
    featured: false,
  },
  {
    id: 3,
    title: "Calça Jeans Slim",
    brand: "Denim Lab",
    category: "Calças",
    gender: "unissex",
    price: 169.9,
    oldPrice: 229.9,
    image:
      "https://images.unsplash.com/photo-1608370946545-7d93571b5593?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1608370946545-7d93571b5593?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1714143136367-7bb68f3f0669",
        "photo-1565416700374-d0efa117d162",
        "photo-1586605561986-99a0a999b16a",
      ],
    ),
    sizes: ["38", "40", "42", "44"],
    featured: true,
  },
  {
    id: 4,
    title: "Calça Alfaiataria Preta",
    brand: "Urban Basic",
    category: "Calças",
    gender: "feminino",
    price: 189.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1790539460016-2c5a7a4e16be?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1790539460016-2c5a7a4e16be?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1688736582546-8dde8c94b010",
        "photo-1697648266964-efd056368447",
        "photo-1600713742368-fb681006ee3d",
      ],
    ),
    sizes: ["P", "M", "G"],
    featured: false,
  },
  {
    id: 5,
    title: "Vestido Midi Floral",
    brand: "Bella Moda",
    category: "Vestidos",
    gender: "feminino",
    price: 219.9,
    oldPrice: 299.9,
    image:
      "https://images.unsplash.com/photo-1602010069450-0a62034f235c?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1602010069450-0a62034f235c?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1687621029654-787c0d11aa0f",
        "photo-1591493936559-c34b4f9519bb",
        "photo-1762342015434-f29fcf198000",
      ],
    ),
    sizes: ["P", "M", "G"],
    featured: true,
  },
  {
    id: 6,
    title: "Vestido Curto Linho",
    brand: "Bella Moda",
    category: "Vestidos",
    gender: "feminino",
    price: 149.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1592980187549-111cda6a1ec5?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1592980187549-111cda6a1ec5?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1762342015434-f29fcf198000",
        "photo-1762342014516-37b06138a389",
        "photo-1596388752422-33e637d2e5b3",
      ],
    ),
    sizes: ["P", "M"],
    featured: false,
  },
  {
    id: 7,
    title: "Jaqueta Jeans Clássica",
    brand: "Denim Lab",
    category: "Jaquetas",
    gender: "masculino",
    price: 259.9,
    oldPrice: 329.9,
    image:
      "https://images.unsplash.com/photo-1611912901957-80caca8de69a?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1611912901957-80caca8de69a?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1711594106011-b4db7e26d213",
        "photo-1625408460939-0036edd866f7",
        "photo-1558485199-d0770e16a8ea",
      ],
    ),
    sizes: ["M", "G", "GG"],
    featured: true,
  },
  {
    id: 8,
    title: "Jaqueta Corta-Vento",
    brand: "Street Co.",
    category: "Jaquetas",
    gender: "masculino",
    price: 199.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1564099973389-c8ea3ecca772?auto=format&fit=crop&w=600&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1564099973389-c8ea3ecca772?auto=format&fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1773932547838-ef718d432656?auto=format&fit=crop&w=600&h=800&q=80",
      "https://images.pexels.com/photos/13085468/pexels-photo-13085468.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
      "https://images.pexels.com/photos/18846711/pexels-photo-18846711.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    ],
    sizes: ["P", "M", "G", "GG"],
    featured: true,
    sport: true,
  },
  {
    id: 9,
    title: "Boné Dad Hat",
    brand: "Street Co.",
    category: "Acessórios",
    gender: "unissex",
    price: 49.9,
    oldPrice: 69.9,
    image:
      "https://images.unsplash.com/photo-1781271573324-7e43bfec8c3d?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1781271573324-7e43bfec8c3d?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1606479786205-07747af196e4",
        "photo-1774346865414-f1b348ddb81f",
        "photo-1609868656710-4f299e957ec5",
      ],
    ),
    sizes: ["Único"],
    featured: false,
  },
  {
    id: 10,
    title: "Cinto de Couro",
    brand: "Urban Basic",
    category: "Acessórios",
    gender: "masculino",
    price: 89.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1788546451826-8c8197e11091?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1788546451826-8c8197e11091?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1621364762477-3977206aadd3",
        "photo-1720287971827-d9ced7373322",
        "photo-1733302884097-0826151bb6ad",
      ],
    ),
    sizes: ["90", "100", "110"],
    featured: false,
  },
  {
    id: 11,
    title: "Camisa Social Slim",
    brand: "Urban Basic",
    category: "Camisetas",
    gender: "masculino",
    price: 129.9,
    oldPrice: 169.9,
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1594938291221-94f18cbb5660",
        "photo-1627225924765-552d49cf47ad",
        "photo-1592994238317-fcf75c5466fd",
      ],
    ),
    sizes: ["P", "M", "G"],
    featured: true,
  },
  {
    id: 12,
    title: "Calça Jogger Moletom",
    brand: "Street Co.",
    category: "Calças",
    gender: "unissex",
    price: 119.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1789110519605-c5ceeeab5a0f?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1789110519605-c5ceeeab5a0f?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1789110519894-e56e4db1f0c1",
        "photo-1590330297626-d7aff25a0431",
        "photo-1635969506664-9d490128ba30",
      ],
    ),
    sizes: ["P", "M", "G", "GG"],
    featured: false,
    sport: true,
  },

  // Esportivo
  {
    id: 13,
    title: "Legging Esportiva Compressão",
    brand: "Sport Pro",
    category: "Calças",
    gender: "feminino",
    price: 99.9,
    oldPrice: 139.9,
    image:
      "https://images.unsplash.com/photo-1789111161057-90c5ce12dc21?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1789111161057-90c5ce12dc21?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1649318098063-65fc689bcd8a",
        "photo-1759476597638-ca23a00216a3",
        "photo-1597586309263-2b6668e87303",
      ],
    ),
    sizes: ["P", "M", "G"],
    featured: false,
    sport: true,
  },
  {
    id: 14,
    title: "Short Esportivo Dry",
    brand: "Sport Pro",
    category: "Shorts",
    gender: "unissex",
    price: 69.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1588689653274-cd16f09dc67b?auto=format&fit=crop&w=600&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1588689653274-cd16f09dc67b?auto=format&fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1790337411973-57900a8e4962?auto=format&fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1759476597638-ca23a00216a3?auto=format&fit=crop&w=600&h=800&q=80",
      "https://images.pexels.com/photos/5275783/pexels-photo-5275783.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    ],
    sizes: ["P", "M", "G", "GG"],
    featured: true,
    sport: true,
  },
  {
    id: 15,
    title: "Camiseta Dry Fit",
    brand: "Sport Pro",
    category: "Camisetas",
    gender: "unissex",
    price: 74.9,
    oldPrice: 99.9,
    image:
      "https://images.unsplash.com/photo-1789139334212-50d2f9e56dab?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1789139334212-50d2f9e56dab?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1752778597829-9e92e6d8b42f",
        "photo-1623285512357-ff3b9a7579ea",
        "photo-1659081441720-ddc9e2c21b76",
      ],
    ),
    sizes: ["P", "M", "G", "GG"],
    featured: false,
    sport: true,
  },

  // Infantil
  {
    id: 16,
    title: "Camiseta Dinossauro",
    brand: "Mini Club",
    category: "Camisetas",
    gender: "infantil",
    kids: "menino",
    price: 49.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1756621716915-cb8723574795?auto=format&fit=crop&w=600&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1756621716915-cb8723574795?auto=format&fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1628183546183-0df127c69fff?auto=format&fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1598564136396-93bb32f18f73?auto=format&fit=crop&w=600&h=800&q=80",
      "https://images.pexels.com/photos/9565068/pexels-photo-9565068.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    ],
    sizes: ["1-4", "5-8", "9-12"],
    featured: false,
  },
  {
    id: 17,
    title: "Vestido Infantil Poá",
    brand: "Mini Club",
    category: "Vestidos",
    gender: "infantil",
    kids: "menina",
    price: 89.9,
    oldPrice: 119.9,
    image:
      "https://images.unsplash.com/photo-1601588845354-c45c8d218619?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1601588845354-c45c8d218619?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1591493936559-c34b4f9519bb",
        "photo-1762342015434-f29fcf198000",
        "photo-1762342014516-37b06138a389",
      ],
    ),
    sizes: ["1-4", "5-8", "9-12"],
    featured: false,
  },
  {
    id: 18,
    title: "Conjunto Bebê Moletom",
    brand: "Mini Club",
    category: "Conjuntos",
    gender: "infantil",
    kids: "bebe",
    price: 99.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1727924571257-4235cd4db29e?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1727924571257-4235cd4db29e?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1637161065977-014b2935d84d",
        "photo-1747069340536-4db7b52b8a73",
        "photo-1735653095719-d5f4265c1440",
      ],
    ),
    sizes: ["0-12M", "1-4"],
    featured: false,
  },
  {
    id: 19,
    title: "Bermuda Infantil Jeans",
    brand: "Mini Club",
    category: "Shorts",
    gender: "infantil",
    kids: "menino",
    price: 69.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1597818314436-27efd28b29db?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1597818314436-27efd28b29db?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1591195853828-11db59a44f6b",
        "photo-1593263049629-a6bbe863049f",
        "photo-1596958904953-6a5fc35d7774",
      ],
    ),
    sizes: ["5-8", "9-12"],
    featured: false,
  },
  {
    id: 20,
    title: "Calça Legging Infantil",
    brand: "Mini Club",
    category: "Calças",
    gender: "infantil",
    kids: "menina",
    price: 54.9,
    oldPrice: 69.9,
    image:
      "https://images.unsplash.com/photo-1649318098063-65fc689bcd8a?auto=format&fit=crop&w=600&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1649318098063-65fc689bcd8a?auto=format&fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1649318093828-4949cbf416bb?auto=format&fit=crop&w=600&h=800&q=80",
      "https://images.pexels.com/photos/6182753/pexels-photo-6182753.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
      "https://images.pexels.com/photos/30147132/pexels-photo-30147132.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    ],
    sizes: ["1-4", "5-8", "9-12"],
    featured: false,
  },
  {
    id: 21,
    title: "Boné Infantil Aba Curva",
    brand: "Mini Club",
    category: "Acessórios",
    gender: "infantil",
    kids: "menino",
    price: 39.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1786736562543-96825014d4e3?auto=format&fit=crop&w=600&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1786736562543-96825014d4e3?auto=format&fit=crop&w=600&h=800&q=80",
      "https://images.pexels.com/photos/33227527/pexels-photo-33227527.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
      "https://images.pexels.com/photos/749077/pexels-photo-749077.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
      "https://images.pexels.com/photos/18240755/pexels-photo-18240755.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    ],
    sizes: ["Único"],
    featured: true,
  },
  {
    id: 22,
    title: "Camiseta Baby Look Algodão",
    brand: "Bella Moda",
    category: "Camisetas",
    gender: "feminino",
    price: 59.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1483985988355-763728e1935b",
        "photo-1515886657613-9f3515b0c78f",
        "photo-1485968579580-b6d095142e6e",
      ],
    ),
    sizes: ["P", "M", "G", "GG"],
    featured: false,
  },
  {
    id: 23,
    title: "Camiseta Feminina Over",
    brand: "Bella Moda",
    category: "Camisetas",
    gender: "feminino",
    price: 79.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1529139574466-a303027c1d8b",
        "photo-1485968579580-b6d095142e6e",
        "photo-1483985988355-763728e1935b",
      ],
    ),
    sizes: ["P", "M", "G", "GG"],
    featured: false,
  },
  {
    id: 24,
    title: "Jaqueta Jeans Feminina Oversized",
    brand: "Bella Moda",
    category: "Jaquetas",
    gender: "feminino",
    price: 259.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1483985988355-763728e1935b",
        "photo-1529139574466-a303027c1d8b",
        "photo-1515886657613-9f3515b0c78f",
      ],
    ),
    sizes: ["P", "M", "G", "GG"],
    featured: false,
  },
  {
    id: 25,
    title: "Jaqueta Corta-Vento Feminina",
    brand: "Bella Moda",
    category: "Jaquetas",
    gender: "feminino",
    price: 199.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1485968579580-b6d095142e6e",
        "photo-1529139574466-a303027c1d8b",
        "photo-1515886657613-9f3515b0c78f",
      ],
    ),
    sizes: ["P", "M", "G", "GG"],
    featured: false,
  },
  {
    id: 26,
    title: "Óculos de Sol Vintage",
    brand: "Bella Moda",
    category: "Acessórios",
    gender: "feminino",
    price: 89.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1508296695146-257a814070b4",
        "photo-1517841905240-472988babdf9",
        "photo-1483985988355-763728e1935b",
      ],
    ),
    sizes: ["Único"],
    featured: false,
  },
  {
    id: 27,
    title: "Bolsa Tiracolo Couro",
    brand: "Bella Moda",
    category: "Acessórios",
    gender: "feminino",
    price: 229.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1548036328-c9fa89d128fa",
        "photo-1584917865442-de89df76afd3",
        "photo-1590874103328-eac38a683ce7",
      ],
    ),
    sizes: ["Único"],
    featured: false,
  },
  {
    id: 28,
    title: "Boné Feminino Aba Curva",
    brand: "Bella Moda",
    category: "Acessórios",
    gender: "feminino",
    price: 49.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1521369909029-2afed882baee",
        "photo-1592367630397-65872fe016e9",
        "photo-1635650804512-003e5ee6ccac",
      ],
    ),
    sizes: ["Único"],
    featured: false,
  },
  {
    id: 29,
    title: "Boné Masculino Streetwear",
    brand: "Street Co.",
    category: "Acessórios",
    gender: "masculino",
    price: 54.9,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1606479786205-07747af196e4?auto=format&fit=crop&w=600&h=800&q=80",
    images: gallery(
      "https://images.unsplash.com/photo-1606479786205-07747af196e4?auto=format&fit=crop&w=600&h=800&q=80",
      [
        "photo-1781271573324-7e43bfec8c3d",
        "photo-1774346865414-f1b348ddb81f",
        "photo-1609868656710-4f299e957ec5",
      ],
    ),
    sizes: ["Único"],
    featured: false,
  },
];

export const seedProducts = rawProducts;
