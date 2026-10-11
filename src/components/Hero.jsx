import { Link } from 'react-router-dom';
import { brand } from '../config/brand';

const tones = {
  sage: '#8fae9b',
  terracotta: '#c8745a',
  navy: '#2f4057',
  sand: '#e3cfae',
};

// Textura de tecido (trama) feita só com CSS
const weave =
  'repeating-linear-gradient(0deg, rgba(255,255,255,0.22) 0 5px, transparent 5px 10px), repeating-linear-gradient(90deg, rgba(0,0,0,0.14) 0 5px, transparent 5px 10px)';

// Sem `src` mostra a amostra de tecido; com `src` mostra a foto.
function Polaroid({ tone, src, className = '' }) {
  return (
    <div className={`bg-white p-2 pb-7 shadow-xl shadow-black/25 ${className}`}>
      {src ? (
        <img src={src} alt="" className="aspect-4/5 w-full object-cover" />
      ) : (
        <div
          className="aspect-4/5 w-full"
          style={{ backgroundColor: tones[tone], backgroundImage: weave }}
        />
      )}
    </div>
  );
}

function PhotoStack({ side }) {
  const left = side === 'left';

  return (
    <div
      aria-hidden="true"
      className={`relative hidden h-400px w-340px xl:block ${
        left ? 'justify-self-end' : 'justify-self-start'
      }`}
    >
      <Polaroid
        tone={left ? 'sage' : 'navy'}
        className={`absolute top-4 w-[62%] ${left ? 'left-0 -rotate-6' : 'right-0 rotate-6'}`}
      />
      <Polaroid
        tone={left ? 'terracotta' : 'sand'}
        className={`absolute top-36 w-[48%] ${left ? 'right-0 rotate-6' : 'left-0 -rotate-6'}`}
      />
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

          {/* Versão compacta das amostras para telas menores */}
          <div aria-hidden="true" className="mt-12 flex justify-center gap-3 xl:hidden">
            <Polaroid tone="sage" className="w-24 -rotate-6 sm:w-32" />
            <Polaroid tone="terracotta" className="mt-4 w-24 rotate-3 sm:w-32" />
            <Polaroid tone="navy" className="w-24 rotate-6 sm:w-32" />
          </div>
        </div>

        <PhotoStack side="right" />
      </div>
    </section>
  );
}