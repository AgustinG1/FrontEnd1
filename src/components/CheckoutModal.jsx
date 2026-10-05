import { useEffect, useRef } from 'react';
import { formatPrice } from '../utils/format.js';

export default function CheckoutModal({ checkout, onConfirm, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => { if (dialog.open) dialog.close(); };
  }, []);

  return (
    <dialog ref={dialogRef} className="checkout-dialog" aria-labelledby="checkout-title" onCancel={onClose}>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-start gap-3">
          <h2 id="checkout-title" className="h4">{checkout.confirmed ? '¡Compra simulada confirmada!' : 'Confirma tu compra simulada'}</h2>
          <button type="button" className="btn-close" aria-label="Cerrar resumen de compra" onClick={onClose} />
        </div>
        <p className="mt-3">{checkout.totals.quantity} productos · Total: <strong>{formatPrice(checkout.totals.price)}</strong></p>
        <p className="text-muted">{checkout.confirmed ? 'El carrito se ha vaciado. Puedes seguir explorando el catálogo.' : 'Esta demostración no solicita datos de pago ni realiza cobros.'}</p>
        <div className="d-flex gap-2 justify-content-end flex-wrap">
          {checkout.confirmed ? <button type="button" className="btn btn-gamezone" onClick={onClose}>Seguir comprando</button> : (
            <><button type="button" className="btn btn-outline-secondary" onClick={onClose}>Volver al carrito</button><button type="button" className="btn btn-gamezone" onClick={onConfirm}>Confirmar compra simulada</button></>
          )}
        </div>
      </div>
    </dialog>
  );
}
