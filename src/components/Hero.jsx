import { Link } from 'react-router-dom';

function Polaroid({ seed, className = '' }) {
  return (
    <div
      className={`absolute bg-white p-2 pb-8 shadow-2xl shadow-black/30 md:p-3 md:pb-12 ${className}`}
    >
      <img
        src={`https://picsum.photos/seed/${seed}/500/650`}
        alt=""
        className="aspect-4/5 w-full object-cover"
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative h-[calc(100svh-52px)] min-h-600px overflow-hidden bg-linear-to-b from-[#4f9c9a] via-[#7db8b3] to-[#e5d2c9]">
      {/* "onda" decorativa */}
      <div className="absolute inset-x-0 top-[55%] h-24 -rotate-2 bg-white/25 blur-2xl" />

      {/* Título */}
      <div className="relative z-10 flex justify-center pt-40 text-white">
        <div className="flex items-end gap-3">
          <h1 className="text-[clamp(4rem,14vw,13rem)] font-light leading-none tracking-tight">
            VERÃO
          </h1>
          <div className="mb-[1.5vw] flex flex-col items-center">
            <span className="rounded-full bg-white px-[2vw] py-[0.5vw] text-[clamp(1rem,3.5vw,3.5rem)] font-medium lowercase text-teal-600">
              loja•
            </span>
            <span className="text-[clamp(1rem,2.4vw,2.4rem)] font-light">2027</span>
          </div>
        </div>
      </div>

      {/* Fotos (esquerda) */}
      <Polaroid seed="verao-f1" className="left-[4%] top-[48%] w-[40%] -rotate-6 md:left-[5%] md:top-[43%] md:w-[18%]" />
      <Polaroid seed="verao-f2" className="left-[18%] top-[38%] hidden w-[11%] rotate-6 md:block" />
      <Polaroid seed="verao-f3" className="left-[21.5%] top-[58%] hidden w-[10.5%] rotate-[8deg] md:block" />

      {/* Fotos (direita) */}
      <Polaroid seed="verao-m1" className="right-[4%] top-[52%] w-[40%] rotate-[4deg] md:right-[4%] md:top-[40%] md:w-[19%]" />
      <Polaroid seed="verao-m2" className="right-[18%] top-[45%] hidden w-[11%] rotate-18deg md:block" />
      <Polaroid seed="verao-m3" className="right-[22%] top-[70%] hidden w-[10%] -rotate-3 md:block" />

      {/* Banner inteiro clicável */}
      <Link to="/catalogo" aria-label="Ver coleção Verão 2027" className="absolute inset-0 z-20" />
    </section>
  );
}