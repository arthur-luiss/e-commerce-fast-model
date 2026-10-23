import { sameId } from '../../utils/products';
import { validateReview } from '../../utils/reviews';
import { products } from './products';
import { createId, read, write } from './storage';

// Sem login, "quem escreveu" é identificado por um código deste navegador.
// Com contas de verdade, isso vira o id do usuário.
function getDeviceId() {
  let id = read('device-id', null);
  if (!id) {
    id = createId();
    write('device-id', id);
  }
  return id;
}

const all = () => read('reviews', []);

const toPublic = ({ authorId, ...review }, deviceId) => ({ ...review, mine: authorId === deviceId });

export const reviews = {
  async listByProduct(productId) {
    const deviceId = getDeviceId();
    return all()
      .filter((r) => sameId(r.productId, productId))
      .map((r) => toPublic(r, deviceId))
      .sort((a, b) => b.createdAt - a.createdAt);
  },

  // { [productId]: { count, average } } em uma só chamada, para os cards do catálogo
  async summaries() {
    const totals = {};
    for (const r of all()) {
      const t = (totals[r.productId] ??= { sum: 0, count: 0 });
      t.sum += r.rating;
      t.count += 1;
    }
    return Object.fromEntries(
      Object.entries(totals).map(([id, t]) => [id, { count: t.count, average: t.sum / t.count }])
    );
  },

  async create({ productId, rating, name, comment }) {
    if (Object.keys(validateReview({ rating, name, comment })).length > 0) {
      throw new Error('Avaliação inválida.');
    }
    if (!(await products.getById(productId))) throw new Error('Produto não encontrado.');

    const deviceId = getDeviceId();
    const review = {
      id: createId(),
      productId,
      rating,
      name: name.trim(),
      comment: comment.trim(),
      createdAt: Date.now(),
      // "Compra verificada": o autor tem pedido com este produto
      verified: read('orders', []).some((o) => o.items.some((i) => sameId(i.id, productId))),
      authorId: deviceId,
    };

    // uma avaliação por produto por autor
    write('reviews', [
      review,
      ...all().filter((r) => !(r.authorId === deviceId && sameId(r.productId, productId))),
    ]);

    return toPublic(review, deviceId);
  },

  async remove(id) {
    const deviceId = getDeviceId();
    const target = all().find((r) => r.id === id);
    if (!target || target.authorId !== deviceId) {
      throw new Error('Você só pode excluir a sua própria avaliação.');
    }
    write('reviews', all().filter((r) => r.id !== id));
  },
};