import { sameId } from '../../utils/products';
import { seedProducts } from './seed';
import { read } from './storage';

// Até existir um banco, os produtos vêm do seed (e, no painel do dono, de edições salvas no navegador).
const load = () => read('products', seedProducts);

export const products = {
  async list() {
    return load();
  },

  async getById(id) {
    return load().find((p) => sameId(p.id, id)) ?? null;
  },
};