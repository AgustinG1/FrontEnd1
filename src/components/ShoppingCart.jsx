import { assetUrl, formatPrice } from '../utils/format.js';
import { productPrice } from '../utils/cart.js';
import CartTotal from './CartTotal.jsx';

export default function ShoppingCart({ cart, onQuantityChange, onRemove, onClear, onCheckout }) {
  return (
    <aside id="resumen-carrito" className="cart-panel" aria-labelledby="titulo-carrito">
      <h2 id="titulo-carrito" className="section-title">🛒 Tu carrito</h2>
      {cart.length === 0 ? (
        <div className="empty-cart"><p className="fw-semibold">Tu carrito está vacío.</p><p className="small text-muted mb-0">Elige un producto del catálogo para comenzar.</p></div>
      ) : (
        <ul className="list-group list-group-flush mb-3">
          {cart.map((item) => (
            <li className="list-group-item cart-item" key={item.id}>
              <div className="d-flex gap-3 align-items-start">
                <img className="cart-thumbnail" src={assetUrl(item.imagen)} alt="" />
                <div className="flex-grow-1">
                  <h3 className="h6 mb-1">{item.nombre}</h3>
                  <p className="small text-muted mb-2">{formatPrice(productPrice(item))} por unidad</p>
                  <div className="d-flex gap-2 align-items-center flex-wrap">
                    <div className="btn-group" role="group" aria-label={`Cantidad de ${item.nombre}`}>
                      <button type="button" className="btn btn-sm btn-outline-secondary" aria-label={`Disminuir cantidad de ${item.nombre}`} onClick={() => onQuantityChange(item.id, item.cantidad - 1)}>−</button>
                      <span className="quantity-value" aria-label={`Cantidad: ${item.cantidad}`}>{item.cantidad}</span>
                      <button type="button" className="btn btn-sm btn-outline-secondary" aria-label={`Aumentar cantidad de ${item.nombre}`} onClick={() => onQuantityChange(item.id, item.cantidad + 1)}>+</button>
                    </div>
                    <button type="button" className="btn btn-sm btn-link text-danger" aria-label={`Quitar ${item.nombre}`} onClick={() => onRemove(item.id)}>Quitar</button>
                  </div>
                  <p className="fw-semibold mt-2 mb-0">Subtotal: {formatPrice(productPrice(item) * item.cantidad)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <CartTotal cart={cart} />
      <div className="d-grid gap-2 mt-3">
        <button type="button" className="btn btn-gamezone" disabled={cart.length === 0} onClick={onCheckout}>Finalizar compra</button>
        <button type="button" className="btn btn-outline-secondary" disabled={cart.length === 0} onClick={onClear}>Vaciar carrito</button>
      </div>
      <p className="small text-muted mt-3 mb-0">La compra se confirma como una simulación, sin realizar cobros.</p>
    </aside>
  );
}
