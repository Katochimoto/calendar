import { polyfill } from 'raf';
import context from '../context';

polyfill();

export function raf (callback) {
  return context.requestAnimationFrame(callback);
}

export function caf (id) {
  return context.cancelAnimationFrame(id);
}
