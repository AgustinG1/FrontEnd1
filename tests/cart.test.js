import test from 'node:test';
import assert from 'node:assert/strict';
import { addProduct, changeQuantity, cartTotals } from '../src/utils/cart.js';

const game = { id: 1, nombre: 'Juego', precio: 29990, precioOferta: 26990 };
const accessory = { id: 2, nombre: 'Control', precio: 49990 };

test('agregar un duplicado lo agrupa y suma unidades sin alterar el estado anterior', () => {
  const initial = addProduct([], game);
  const updated = addProduct(initial, game);
  assert.equal(updated.length, 1);
  assert.equal(updated[0].cantidad, 2);
  assert.equal(initial[0].cantidad, 1);
  assert.deepEqual(cartTotals(updated), { quantity: 2, price: 53980 });
});
test('el total combina ofertas, precios normales y cantidades', () => {
  const cart = addProduct(addProduct(addProduct([], game), game), accessory);
  assert.deepEqual(cartTotals(cart), { quantity: 3, price: 103970 });
});
test('disminuir y quitar conserva las demás líneas y recalcula el total', () => {
  let cart = addProduct(addProduct([], game), accessory);
  cart = changeQuantity(cart, game.id, 3);
  cart = changeQuantity(cart, game.id, 2);
  assert.equal(cart[0].cantidad, 2);
  cart = changeQuantity(cart, game.id, 0);
  assert.deepEqual(cartTotals(cart), { quantity: 1, price: 49990 });
});
test('cantidades inválidas no corrompen el carrito', () => {
  const cart = addProduct([], game);
  for (const invalid of [-1, NaN, 1.5, '2']) assert.deepEqual(changeQuantity(cart, 1, invalid), cart);
});
test('carrito vacío tiene cantidad y total cero', () => {
  assert.deepEqual(cartTotals([]), { quantity: 0, price: 0 });
});
