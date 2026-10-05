import { useEffect } from 'react';

export default function Notification({ notification, onClose }) {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  if (!notification) return null;
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div className="toast show align-items-center text-bg-dark border-0" role="status" aria-live="polite">
        <div className="d-flex"><div className="toast-body">{notification.message}</div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" aria-label="Cerrar notificación" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
