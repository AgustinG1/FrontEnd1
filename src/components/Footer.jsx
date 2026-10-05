export default function Footer() {
  return (
    <footer id="contacto" className="py-4 mt-5">
      <div className="container text-center">
        <h2 className="h5 mb-3">Contáctanos</h2>
        <p className="mb-1">📍 Avenida Los Videojuegos 123, Santiago, Chile</p>
        <p className="mb-1">📞 +56 9 1234 5678</p>
        <p className="mb-3">✉️ <a href="mailto:contacto@gamezone.cl">contacto@gamezone.cl</a></p>
        <ul className="list-unstyled d-flex justify-content-center gap-3 flex-wrap mb-3">
          <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
        </ul>
        <p className="small mb-0">Copyright © 2026 GameZone. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
