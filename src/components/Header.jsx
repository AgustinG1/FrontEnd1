import { useState } from 'react';

export default function Header({ quantity, onCategoryChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  function selectCategory(category) {
    onCategoryChange(category);
    setCategoriesOpen(false);
    setMenuOpen(false);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-gamezone" aria-label="Navegación principal">
      <div className="container">
        <a className="navbar-brand fw-bold fs-4" href="#inicio">🎮 GameZone</a>
        <button className="navbar-toggler" type="button" aria-controls="menuPrincipal"
          aria-expanded={menuOpen} aria-label="Abrir menú de navegación"
          onClick={() => setMenuOpen((open) => !open)}>
          <span className="navbar-toggler-icon" />
        </button>
        <div id="menuPrincipal" className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item"><a className="nav-link" href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a></li>
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle" type="button" aria-expanded={categoriesOpen}
                onClick={() => setCategoriesOpen((open) => !open)}>Categorías</button>
              {categoriesOpen && (
                <ul className="dropdown-menu dropdown-menu-dark show">
                  {['todos', 'videojuegos', 'accesorios'].map((category) => (
                    <li key={category}><a className="dropdown-item text-capitalize" href="#productos-destacados"
                      onClick={() => selectCategory(category)}>{category === 'todos' ? 'Todos los productos' : category}</a></li>
                  ))}
                </ul>
              )}
            </li>
            <li className="nav-item"><a className="nav-link" href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a></li>
            <li className="nav-item"><a className="nav-link" href="#resumen-carrito" onClick={() => setMenuOpen(false)}>
              🛒 Carrito <span className="badge bg-acento rounded-pill" aria-label={`${quantity} productos en el carrito`}>{quantity}</span>
            </a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
