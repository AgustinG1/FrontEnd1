import { assetUrl, formatPrice } from '../utils/format.js';
import { productPrice } from '../utils/cart.js';

export default function ProductCard({ product, quantity, onAdd }) {
  const hasOffer = product.precioOferta != null && product.precioOferta < product.precio;
  return (
    <article className="card h-100 shadow-sm card-producto">
      <img src={assetUrl(product.imagen)} alt={product.nombre} className="card-img-top" loading="lazy" />
      <div className="card-body d-flex flex-column">
        <div className="d-flex gap-2 flex-wrap mb-3">
          <span className="badge text-bg-secondary text-capitalize">{product.categoria}</span>
          {hasOffer && <span className="badge bg-acento">Oferta</span>}
        </div>
        <h3 className="card-title h5">{product.nombre}</h3>
        <p className="card-text small flex-grow-1">{product.descripcion}</p>
        <div className="mb-3">
          {hasOffer && <p className="small text-muted mb-1">Precio normal: <del>{formatPrice(product.precio)}</del></p>}
          <p className="fw-bold fs-4 mb-0">{formatPrice(productPrice(product))}</p>
        </div>
        <button type="button" className={`btn ${quantity ? 'btn-outline-gamezone' : 'btn-gamezone'}`}
          aria-label={`${quantity ? 'Agregar otra unidad de' : 'Agregar al carrito:'} ${product.nombre}`}
          onClick={() => onAdd(product)}>
          {quantity ? `En el carrito (${quantity}) · Agregar otro` : 'Agregar al carrito'}
        </button>
      </div>
    </article>
  );
}
