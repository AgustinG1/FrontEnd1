// Usa el precio de oferta si está disponible.
export function productPrice(product) {
  return product.precioOferta ?? product.precio;
}

export function addProduct(cart, product) {
  const existing = cart.find((item) => item.id === product.id);
  return existing
    ? cart.map((item) => item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item)
    : [...cart, { ...product, cantidad: 1 }];
}

// Una cantidad cero elimina el producto sin modificar el arreglo original.
export function changeQuantity(cart, id, quantity) {
  if (!Number.isInteger(quantity) || quantity < 0) return cart;
  if (quantity === 0) return cart.filter((item) => item.id !== id);
  return cart.map((item) => item.id === id ? { ...item, cantidad: quantity } : item);
}

export function cartTotals(cart) {
  return cart.reduce((summary, item) => ({
    quantity: summary.quantity + item.cantidad,
    price: summary.price + productPrice(item) * item.cantidad,
  }), { quantity: 0, price: 0 });
}
