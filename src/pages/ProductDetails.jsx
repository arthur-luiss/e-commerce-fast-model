import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import ProductCard from "../components/ProductCard";
import { formatBRL, getDiscount } from "../utils/format";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { useAuth } from "../hooks/useAuth";
import { hasStoredSession } from "../utils/userStorage";
import ProductReviews from "../components/ProductReviews";
import StarRating from "../components/StarRating";
import { useReviews } from "../hooks/useReviews";
import { formatRating } from "../utils/reviews";
import { PageError, PageLoading } from "../components/PageState";
import { useProducts } from "../hooks/useProducts";
import { genderLabels, getRelatedProducts } from "../utils/products";

const getGalleryImages = (product) => {
  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images;
  }

  if (!product.image) return [];

  const crops = ["top", "bottom", "faces"];
  return [
    product.image,
    ...crops.map((crop) => {
      const url = new URL(product.image);
      url.searchParams.set("crop", crop);
      return url.toString();
    }),
  ];
};

function Section({ title, defaultOpen = false, children }) {
  return (
    <details open={defaultOpen} className="group border-b border-slate-200">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold uppercase tracking-wide [&::-webkit-details-marker]:hidden">
        {title}
        <Icon
          name="chevron"
          className="h-4 w-4 transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="pb-5 text-sm leading-relaxed text-slate-600">
        {children}
      </div>
    </details>
  );
}

function ProductView({ product }) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [showError, setShowError] = useState(false);
  const { getSummary } = useReviews();

  const discount = getDiscount(product.price, product.oldPrice);
  const favorite = isFavorite(product.id);
  const summary = getSummary(product.id);
  const { products } = useProducts();
  const related = getRelatedProducts(products, product);
  const galleryImages = getGalleryImages(product);

  const handleAdd = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/produto/${product.id}` } });
      return;
    }

    if (!size) {
      setShowError(true);
      return;
    }
    addItem(product, size, 1);
    setAdded(true);
  };

  const handleSelectSize = (s) => {
    setSize(s);
    setShowError(false);
    setAdded(false);
  };

  return (
    <div className="pb-20">
      <nav aria-label="Você está em" className="mb-6 text-xs text-slate-500">
        <Link to="/" className="hover:text-slate-900">
          Início
        </Link>
        <span className="mx-2">/</span>
        <Link
          to={`/catalogo?categoria=${encodeURIComponent(product.category)}`}
          className="hover:text-slate-900"
        >
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">{product.title}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
        {/* Galeria */}
        <div>
          <div className="aspect-3/4 overflow-hidden bg-slate-100">
            <img
              src={galleryImages[activeImage]}
              alt={`${product.title} - foto ${activeImage + 1}`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-3 grid grid-cols-4 gap-3">
            {galleryImages.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === activeImage}
                className={`aspect-3/4 overflow-hidden bg-slate-100 ring-offset-2 transition ${
                  i === activeImage
                    ? "ring-2 ring-slate-900"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={src}
                  alt={`${product.title} - miniatura ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Informações */}
        <div className="md:sticky md:top-32 md:self-start">
          <p className="text-xs uppercase tracking-wider text-slate-400">
            {product.brand}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            {product.title}
          </h1>
          {summary.count > 0 && (
            <a
              href="#avaliacoes"
              className="mt-2 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
            >
              <StarRating value={summary.average} />
              <span>
                {formatRating(summary.average)} · {summary.count} avaliações
              </span>
            </a>
          )}

          <div className="mt-5">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">
                {formatBRL(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-slate-400 line-through">
                  {formatBRL(product.oldPrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="rounded bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white">
                  -{discount}%
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-500">
              ou 6x de {formatBRL(product.price / 6)} sem juros
            </p>
          </div>

          <div className="mt-8">
            <p className="mb-2 text-sm font-semibold">Tamanho</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSelectSize(s)}
                  aria-pressed={size === s}
                  className={`min-w-14 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                    size === s
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-900"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {showError && (
              <p role="alert" className="mt-2 text-sm font-medium text-red-600">
                Selecione um tamanho para continuar.
              </p>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleAdd}
              className="flex-1 rounded-full bg-slate-900 py-4 text-sm font-bold text-white transition-colors hover:bg-slate-700"
            >
              Adicionar ao carrinho
            </button>
            <button
              onClick={() => {
                if (!isAuthenticated || !hasStoredSession()) {
                  navigate("/login");
                  return;
                }
                toggleFavorite(product.id);
              }}
              aria-label={
                favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
              }
              aria-pressed={favorite}
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-colors ${
                favorite
                  ? "border-red-200 bg-red-50 text-red-500"
                  : "border-slate-300 text-slate-700 hover:border-slate-900"
              }`}
            >
              <Icon name="heart" className="h-5 w-5" filled={favorite} />
            </button>
          </div>

          {added && (
            <p
              role="status"
              className="mt-3 text-sm font-medium text-green-600"
            >
              Produto adicionado!{" "}
              <Link to="/carrinho" className="underline">
                Ver carrinho
              </Link>
            </p>
          )}

          <div className="mt-10 border-t border-slate-200">
            {product.description && (
              <Section title="Descrição" defaultOpen>
                {product.description}
              </Section>
            )}

            <Section title="Detalhes" defaultOpen={!product.description}>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
                <dt className="text-slate-400">Marca</dt>
                <dd>{product.brand}</dd>
                <dt className="text-slate-400">Categoria</dt>
                <dd>{product.category}</dd>
                <dt className="text-slate-400">Público</dt>
                <dd>{genderLabels[product.gender]}</dd>
                <dt className="text-slate-400">Código</dt>
                <dd>{String(product.id).padStart(5, "0")}</dd>
              </dl>
            </Section>

            <Section title="Entrega e trocas">
              <ul className="list-disc space-y-1 pl-5">
                <li>Frete grátis em compras acima de R$ 199.</li>
                <li>Parcelamento em até 6x sem juros.</li>
                <li>Troca ou devolução em até 30 dias.</li>
              </ul>
            </Section>
          </div>
        </div>
      </div>

      {/* Relacionados */}
      <ProductReviews product={product} />
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 text-xl font-bold tracking-tight">
            Você também pode gostar
          </h2>
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const { status, reload, getProductById } = useProducts();

  if (status === "loading") return <PageLoading />;
  if (status === "error") return <PageError onRetry={reload} />;

  const product = getProductById(id);

  if (!product) {
    // ...mantenha aqui o bloco "Produto não encontrado" que já existe
  }

  return <ProductView key={product.id} product={product} />;
}
