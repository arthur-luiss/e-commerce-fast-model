import { useState } from "react";
import { Link } from "react-router-dom";
import { brand } from "../config/brand";

const tones = {
  sage: "#7f9f8b",
  terracotta: "#c8745a",
  navy: "#2f4057",
  camel: "#b08968",
};

// Textura de tecido (trama) feita só com CSS
const weave =
  "repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0 5px, transparent 5px 10px), repeating-linear-gradient(90deg, rgba(0,0,0,0.09) 0 5px, transparent 5px 10px)";

// Ilustrações simples de peças, usadas enquanto não há fotos reais
function Piece({ name, tone }) {
  const props = {
    className: "absolute inset-0 m-auto h-3/4 w-3/4",
    "aria-hidden": true,
  };
  const detail = {
    fill: "none",
    stroke: tone,
    strokeWidth: 1.6,
    strokeLinecap: "round",
  };

  switch (name) {
    case "tee":
      return (
        <svg viewBox="0 0 64 64" {...props}>
          <path
            fill="#fff"
            d="M22 8 L8 15 L13 27 L21 23 L21 56 L43 56 L43 23 L51 27 L56 15 L42 8 C40 12 36 14 32 14 C28 14 24 12 22 8 Z"
          />
          <path {...detail} d="M22 8 C24 12 28 14 32 14 C36 14 40 12 42 8" />
        </svg>
      );
    case "dress":
      return (
        <svg viewBox="0 0 64 64" {...props}>
          <path
            fill="#fff"
            d="M23 6 L27 6 L29 17 L35 17 L37 6 L41 6 L42 22 L51 57 L13 57 L22 22 Z"
          />
          <path {...detail} d="M23 28 H41" />
        </svg>
      );
    case "sunglasses":
      return (
        <svg viewBox="0 14 64 40" {...props}>
          <rect x="6" y="26" width="23" height="18" rx="9" fill="#fff" />
          <rect x="35" y="26" width="23" height="18" rx="9" fill="#fff" />
          <path
            d="M29 31 Q32 27 35 31"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M6 30 L2 24 M58 30 L62 24"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );
    case "cap":
      return (
        <svg viewBox="4 4 64 54" {...props}>
          <path
            fill="#fff"
            d="M12 42 C12 24 22 15 33 15 C46 15 54 25 54 42 Z"
          />
          <path fill="#fff" d="M38 42 H62 Q60 50 48 50 H38 Z" />
          <circle cx="33" cy="14" r="2.8" fill="#fff" />
          <path {...detail} d="M33 16 V42" />
        </svg>
      );
    default:
      return null;
  }
}

// Mostra a foto de `src`. Se o arquivo não existir, cai na ilustração da peça.
function Polaroid({ piece, tone, src, className = "" }) {
  const [failed, setFailed] = useState(false);
  const showPhoto = src && !failed;

  return (
    <div
      className={`group cursor-pointer bg-white p-2 pb-7 shadow-xl shadow-black/25 transition-all duration-300 ease-out hover:z-20 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40 ${className}`}
    >
      <div
        className="relative aspect-4/5 w-full overflow-hidden"
        style={{
          backgroundColor: tones[tone],
          backgroundImage: showPhoto ? undefined : weave,
        }}
      >
        {showPhoto ? (
          <img
            src={src}
            alt=""
            onError={() => setFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <Piece name={piece} tone={tones[tone]} />
        )}
      </div>
    </div>
  );
}

// Para usar fotos reais, coloque os arquivos em public/hero/ com estes nomes.
const stacks = {
  left: [
    {
      piece: "tee",
      tone: "sage",
      src: "/hero/1.jpg",
      className: "left-0 top-4 w-44 -rotate-6",
    },
    {
      piece: "sunglasses",
      tone: "terracotta",
      src: "/hero/2.jpg",
      className: "right-0 top-36 w-36 rotate-6",
    },
  ],
  right: [
    {
      piece: "dress",
      tone: "navy",
      src: "/hero/3.jpg",
      className: "right-0 top-4 w-44 rotate-6",
    },
    {
      piece: "cap",
      tone: "camel",
      src: "/hero/4.jpg",
      className: "left-0 top-36 w-36 -rotate-6",
    },
  ],
};

function PhotoStack({ side }) {
  return (
    <div
      aria-hidden="true"
      className="relative hidden h-96 w-80 justify-self-center xl:block"
    >
      {stacks[side].map((item) => (
        <Polaroid
          key={item.piece}
          {...item}
          className={`absolute ${item.className}`}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#24706e] via-[#3d8e8b] to-[#7bb8b2]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: weave }}
      />

      <div className="relative mx-auto grid min-h-[calc(100svh-52px)] max-w-[1600px] items-center px-6 pb-16 pt-28 md:pt-36 xl:grid-cols-[1fr_auto_1fr]">
        <PhotoStack side="left" />

        <div className="text-center text-white">
          <p className="text-xs font-medium uppercase tracking-[0.4em] md:text-sm">
            {brand.name} apresenta
          </p>
          <h1 className="mt-4 text-[clamp(4rem,11vw,10rem)] font-light leading-none tracking-tight">
            VERÃO
          </h1>
          <p className="mt-3 pl-[0.5em] text-[clamp(1.25rem,3vw,2.5rem)] font-light tracking-[0.5em]">
            2027
          </p>
          <p className="mx-auto mt-6 max-w-sm text-sm text-white/90 md:text-base">
            Peças leves, cores vivas e preços especiais em itens selecionados.
          </p>
          <Link
            to="/catalogo"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-900 hover:text-white"
          >
            Ver coleção
          </Link>

          {/* Versão compacta para telas menores */}
          <div
            aria-hidden="true"
            className="mt-12 flex justify-center gap-3 xl:hidden"
          >
            <Polaroid
              piece="tee"
              tone="sage"
              className="w-24 -rotate-6 sm:w-32"
            />
            <Polaroid
              piece="dress"
              tone="navy"
              className="mt-4 w-24 rotate-3 sm:w-32"
            />
            <Polaroid
              piece="sunglasses"
              tone="terracotta"
              className="w-24 rotate-6 sm:w-32"
            />
          </div>
        </div>

        <PhotoStack side="right" />
      </div>
    </section>
  );
}
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { brand } from '../config/brand';

// const tones = {
//   sage: '#7f9f8b',
//   terracotta: '#c8745a',
//   navy: '#2f4057',
//   camel: '#b08968',
// };

// // Textura de tecido (trama) feita só com CSS
// const weave =
//   'repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0 5px, transparent 5px 10px), repeating-linear-gradient(90deg, rgba(0,0,0,0.09) 0 5px, transparent 5px 10px)';

// // Ilustrações simples de peças, usadas enquanto não há fotos reais
// function Piece({ name, tone }) {
//   const props = { className: 'absolute inset-0 m-auto h-3/4 w-3/4', 'aria-hidden': true };
//   const detail = { fill: 'none', stroke: tone, strokeWidth: 1.6, strokeLinecap: 'round' };

//   switch (name) {
//     case 'tee':
//       return (
//         <svg viewBox="0 0 64 64" {...props}>
//           <path
//             fill="#fff"
//             d="M22 8 L8 15 L13 27 L21 23 L21 56 L43 56 L43 23 L51 27 L56 15 L42 8 C40 12 36 14 32 14 C28 14 24 12 22 8 Z"
//           />
//           <path {...detail} d="M22 8 C24 12 28 14 32 14 C36 14 40 12 42 8" />
//         </svg>
//       );
//     case 'dress':
//       return (
//         <svg viewBox="0 0 64 64" {...props}>
//           <path fill="#fff" d="M23 6 L27 6 L29 17 L35 17 L37 6 L41 6 L42 22 L51 57 L13 57 L22 22 Z" />
//           <path {...detail} d="M23 28 H41" />
//         </svg>
//       );
//     case 'sunglasses':
//       return (
//         <svg viewBox="0 14 64 40" {...props}>
//           <rect x="6" y="26" width="23" height="18" rx="9" fill="#fff" />
//           <rect x="35" y="26" width="23" height="18" rx="9" fill="#fff" />
//           <path d="M29 31 Q32 27 35 31" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
//           <path d="M6 30 L2 24 M58 30 L62 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
//         </svg>
//       );
//     case 'cap':
//       return (
//         <svg viewBox="4 4 64 54" {...props}>
//           <path fill="#fff" d="M12 42 C12 24 22 15 33 15 C46 15 54 25 54 42 Z" />
//           <path fill="#fff" d="M38 42 H62 Q60 50 48 50 H38 Z" />
//           <circle cx="33" cy="14" r="2.8" fill="#fff" />
//           <path {...detail} d="M33 16 V42" />
//         </svg>
//       );
//     default:
//       return null;
//   }
// }

// // Mostra a foto de `src`. Se o arquivo não existir, cai na ilustração da peça.
// function Polaroid({ piece, tone, src, className = '' }) {
//   const [failed, setFailed] = useState(false);
//   const showPhoto = src && !failed;

//   return (
//     <div className={`bg-white p-2 pb-7 shadow-xl shadow-black/25 ${className}`}>
//       <div
//         className="relative aspect-4/5 w-full overflow-hidden"
//         style={{
//           backgroundColor: tones[tone],
//           backgroundImage: showPhoto ? undefined : weave,
//         }}
//       >
//         {showPhoto ? (
//           <img
//             src={src}
//             alt=""
//             onError={() => setFailed(true)}
//             className="h-full w-full object-cover"
//           />
//         ) : (
//           <Piece name={piece} tone={tones[tone]} />
//         )}
//       </div>
//     </div>
//   );
// }

// // Para usar fotos reais, coloque os arquivos em public/hero/ com estes nomes.
// const stacks = {
//   left: [
//     { piece: 'tee', tone: 'sage', src: '/hero/1.jpg', className: 'left-0 top-4 w-44 -rotate-6' },
//     { piece: 'sunglasses', tone: 'terracotta', src: '/hero/2.jpg', className: 'right-0 top-36 w-36 rotate-6' },
//   ],
//   right: [
//     { piece: 'dress', tone: 'navy', src: '/hero/3.jpg', className: 'right-0 top-4 w-44 rotate-6' },
//     { piece: 'cap', tone: 'camel', src: '/hero/4.jpg', className: 'left-0 top-36 w-36 -rotate-6' },
//   ],
// };

// function PhotoStack({ side }) {
//   return (
//     <div aria-hidden="true" className="relative hidden h-96 w-80 justify-self-center xl:block">
//       {stacks[side].map((item) => (
//         <Polaroid key={item.piece} {...item} className={`absolute ${item.className}`} />
//       ))}
//     </div>
//   );
// }

// export default function Hero() {
//   return (
//     <section className="relative overflow-hidden bg-linear-to-b from-[#24706e] via-[#3d8e8b] to-[#7bb8b2]">
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 opacity-[0.07]"
//         style={{ backgroundImage: weave }}
//       />

//       <div className="relative mx-auto grid min-h-[calc(100svh-52px)] max-w-[1600px] items-center px-6 pb-16 pt-28 md:pt-36 xl:grid-cols-[1fr_auto_1fr]">
//         <PhotoStack side="left" />

//         <div className="text-center text-white">
//           <p className="text-xs font-medium uppercase tracking-[0.4em] md:text-sm">
//             {brand.name} apresenta
//           </p>
//           <h1 className="mt-4 text-[clamp(4rem,11vw,10rem)] font-light leading-none tracking-tight">
//             VERÃO
//           </h1>
//           <p className="mt-3 pl-[0.5em] text-[clamp(1.25rem,3vw,2.5rem)] font-light tracking-[0.5em]">
//             2027
//           </p>
//           <p className="mx-auto mt-6 max-w-sm text-sm text-white/90 md:text-base">
//             Peças leves, cores vivas e preços especiais em itens selecionados.
//           </p>
//           <Link
//             to="/catalogo"
//             className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-900 hover:text-white"
//           >
//             Ver coleção
//           </Link>

//           {/* Versão compacta para telas menores */}
//           <div aria-hidden="true" className="mt-12 flex justify-center gap-3 xl:hidden">
//             <Polaroid piece="tee" tone="sage" className="w-24 -rotate-6 sm:w-32" />
//             <Polaroid piece="dress" tone="navy" className="mt-4 w-24 rotate-3 sm:w-32" />
//             <Polaroid piece="sunglasses" tone="terracotta" className="w-24 rotate-6 sm:w-32" />
//           </div>
//         </div>

//         <PhotoStack side="right" />
//       </div>
//     </section>
//   );
// }
