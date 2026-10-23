import { Link } from "react-router-dom";
import { brand } from "../config/brand";

const tones = {
  sage: "#7f9f8b",
  terracotta: "#c8745a",
  navy: "#2f4057",
  camel: "#b08968",
};

const weave =
  "repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0 5px, transparent 5px 10px), repeating-linear-gradient(90deg, rgba(0,0,0,0.09) 0 5px, transparent 5px 10px)";

function Polaroid({ tone, src, className = "" }) {
  return (
    <div
      className={`group cursor-pointer bg-white p-2 pb-7 shadow-xl shadow-black/25 transition-all duration-300 ease-out hover:z-20 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40 ${className}`}
    >
      <div
        className="relative aspect-4/5 w-full overflow-hidden"
        style={{ backgroundColor: tones[tone] }}
      >
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
    </div>
  );
}

const stacks = {
  left: [
    {
      tone: "sage",
      src: "/hero/1.jpg",
      className: "left-0 top-4 w-44 -rotate-6",
    },
    {
      tone: "terracotta",
      src: "/hero/2.jpg",
      className: "right-0 top-36 w-36 rotate-6",
    },
  ],
  right: [
    {
      tone: "navy",
      src: "/hero/3.jpg",
      className: "right-0 top-4 w-44 rotate-6",
    },
    {
      tone: "camel",
      src: "/hero/4.jpg",
      className: "left-0 top-36 w-36 -rotate-6",
    },
  ],
};

const mobilePhotos = [...stacks.left, ...stacks.right];
const mobileRotations = ["-rotate-6", "rotate-3", "rotate-6", "-rotate-3"];

function PhotoStack({ side }) {
  return (
    <div
      aria-hidden="true"
      className="relative hidden h-96 w-80 justify-self-center xl:block"
    >
      {stacks[side].map((item) => (
        <Polaroid
          key={item.src}
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

          <div
            aria-hidden="true"
            className="mx-auto mt-12 grid w-full max-w-[40rem] grid-cols-2 justify-items-center gap-x-8 gap-y-8 xl:hidden sm:grid-cols-4 sm:gap-x-6"
          >
            {mobilePhotos.map((photo, index) => (
              <Polaroid
                key={photo.src}
                {...photo}
                className={`w-[min(36vw,8rem)] sm:w-32 ${mobileRotations[index]}`}
              />
            ))}
          </div>
        </div>

        <PhotoStack side="right" />
      </div>
    </section>
  );
}
