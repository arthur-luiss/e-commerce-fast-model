import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { PageError, PageLoading } from "../components/PageState";
import { useProducts } from "../hooks/useProducts";
import { sameId } from "../utils/products";
import { useFavorites } from "../hooks/useFavorites";

export default function Favorites() {
  const { ids } = useFavorites();
  const { products, status, reload } = useProducts();

  if (status === "loading") return <PageLoading />;
  if (status === "error") return <PageError onRetry={reload} />;

  const favorites = products.filter((p) => ids.some((id) => sameId(id, p.id)));

  if (favorites.length === 0) {
    return (  
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Você ainda não tem favoritos
        </h1>
        <p className="mt-2 text-slate-500">
          Toque no coração dos produtos para guardar o que você gostou.
        </p>
        <Link
          to="/catalogo"
          className="mt-6 inline-block rounded-full bg-slate-900 px-8 py-3 text-sm font-bold text-white hover:bg-slate-700"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Meus favoritos</h1>
        <p className="mt-1 text-sm text-slate-500">
          {favorites.length} produtos
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {favorites.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
