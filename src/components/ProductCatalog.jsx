import { useState } from 'react';
import ProductCard from './ProductCard.jsx';
import { normalizeText } from '../utils/format.js';

export default function ProductCatalog({ products, cart, loading, error, category, search,
  onSearch, onCategoryChange, onAdd, onRetry }) {
  const [query, setQuery] = useState('');
  const results = products.filter((product) =>
    (category === 'todos' || product.categoria === category) &&
    normalizeText(`${product.nombre} ${product.categoria}`).includes(normalizeText(search)),
  );

  function submitSearch(event) {
    event.preventDefault();
    onSearch(query.trim());
  }

  return (
    <section id="productos-destacados" aria-labelledby="titulo-catalogo">
      <h2 id="titulo-catalogo" className="section-title">Catálogo de productos</h2>
      <form className="search-form d-flex gap-2 mb-3" role="search" onSubmit={submitSearch}>
        <label className="visually-hidden" htmlFor="busqueda">Buscar producto</label>
        <input id="busqueda" type="search" className="form-control" value={query}
          placeholder="Buscar por nombre o categoría…" onChange={(event) => setQuery(event.target.value)} />
        <button type="submit" className="btn btn-gamezone" disabled={loading || Boolean(error)}>Buscar</button>
      </form>
      <div className="d-flex gap-2 flex-wrap mb-4" aria-label="Filtrar catálogo por categoría">
        {['todos', 'videojuegos', 'accesorios'].map((value) => (
          <button type="button" key={value} aria-pressed={category === value}
            className={`btn btn-sm text-capitalize ${category === value ? 'btn-gamezone' : 'btn-outline-gamezone'}`}
            onClick={() => onCategoryChange(value)}>{value === 'todos' ? 'Todos los productos' : value}</button>
        ))}
        {search && <button type="button" className="btn btn-sm btn-link" onClick={() => { setQuery(''); onSearch(''); }}>Limpiar búsqueda</button>}
      </div>
      {loading ? (
        <div className="text-center py-5" role="status"><div className="spinner-border text-acento" aria-hidden="true" /><p className="mt-3">Cargando catálogo…</p></div>
      ) : error ? (
        <div className="alert alert-warning" role="alert"><p>{error}</p><button type="button" className="btn btn-gamezone" onClick={onRetry}>Reintentar carga</button></div>
      ) : (
        <>
          <p className="small text-muted" role="status">{results.length} productos{search ? ` para “${search}”` : ''}</p>
          {results.length === 0 ? <p className="alert alert-light">No se encontraron productos. Prueba otra búsqueda o categoría.</p> : (
            <div className="row g-4">
              {results.map((product) => (
                <div className="col-12 col-sm-6 col-xl-4" key={product.id}>
                  <ProductCard product={product} quantity={cart.find((item) => item.id === product.id)?.cantidad ?? 0} onAdd={onAdd} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
