import { formatPrice } from '../utils/format.js';
import { cartTotals } from '../utils/cart.js';

export default function CartTotal({ cart }) {
  const totals = cartTotals(cart);
  return (
    <div className="cart-total" aria-live="polite">
      <p className="mb-2">Productos: <strong>{totals.quantity}</strong></p>
      <p className="fs-4 fw-bold mb-0">Total: {formatPrice(totals.price)}</p>
    </div>
  );
}
