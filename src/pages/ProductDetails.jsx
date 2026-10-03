import { useParams } from 'react-router-dom';
import { getProductById } from '../data/products';

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProductById(id);

  if (!product) return <p className="p-8 text-center text-slate-500">Produto não encontrado.</p>;

  return (
    <div className="p-8 text-center text-xl font-bold text-slate-800">
      Detalhes: {product.title}
    </div>
  );
}