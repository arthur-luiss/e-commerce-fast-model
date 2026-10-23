import { createId, read, write } from './storage';

export const messages = {
  async create({ name, email, subject, message }) {
    const entry = {
      id: createId(),
      createdAt: Date.now(),
      name: name.trim(),
      email: email.trim(),
      subject,
      message: message.trim(),
      read: false,
    };
    write('messages', [entry, ...read('messages', [])]);
    return entry;
  },
};