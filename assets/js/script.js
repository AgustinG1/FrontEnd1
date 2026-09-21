/**
 * GameZone — script.js
 * Semana 6: Optimizando la lógica y rendimiento con JavaScript
 */

// Estado global
let todosLosProductos = [];
let carrito = [];
let totalCarrito = 0;


// Carga el catálogo desde el JSON local
function cargarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    const spinner    = document.getElementById('spinner-productos');

    spinner.classList.remove('d-none');
    contenedor.innerHTML = '';

    fetch('productos.json')
        .then(response => {
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            return response.json();
        })
        .then(datos => {
            spinner.classList.add('d-none');
            todosLosProductos = datos;
            renderizarProductos(datos);
        })
        .catch(error => {
            spinner.classList.add('d-none');
            mostrarError('No se pudo cargar el catálogo. Inténtalo de nuevo más tarde.');
            console.error('Error al cargar productos.json:', error);
        });
}


// Dibuja una lista de productos en el contenedor del DOM
function renderizarProductos(lista) {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '';

    if (lista.length === 0) {
        contenedor.innerHTML = '<p class="text-muted text-center w-100">No se encontraron productos.</p>';
        return;
    }

    lista.forEach(producto => {
        contenedor.appendChild(crearTarjetaProducto(producto));
    });

    // Re-asigna eventos después de renderizar nuevas cards
    inicializarCarrito();
    inicializarHoverCards();
}


// Construye una card de producto con createElement
function crearTarjetaProducto(producto) {
    const col = document.createElement('div');
    col.classList.add('col-12', 'col-sm-6', 'col-md-4');

    const card = document.createElement('div');
    card.classList.add('card', 'h-100', 'shadow-sm', 'card-producto');

    const img = document.createElement('img');
    img.src     = producto.imagen;
    img.alt     = producto.nombre;
    img.classList.add('card-img-top');
    img.loading = 'lazy';

    const body = document.createElement('div');
    body.classList.add('card-body', 'd-flex', 'flex-column');

    const badge = document.createElement('span');
    badge.classList.add('badge', 'bg-secondary', 'mb-2', 'text-capitalize');
    badge.textContent = producto.categoria;

    const titulo = document.createElement('h5');
    titulo.classList.add('card-title', 'text-acento');
    titulo.textContent = producto.nombre;

    const desc = document.createElement('p');
    desc.classList.add('card-text', 'flex-grow-1', 'small');
    desc.textContent = producto.descripcion;

    const pie = document.createElement('div');
    pie.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mt-3');

    const precio = document.createElement('span');
    precio.classList.add('fw-bold', 'fs-5');
    precio.textContent = `$${producto.precio.toLocaleString('es-CL')}`;

    const boton = document.createElement('button');
    boton.classList.add('btn', 'btn-gamezone', 'btn-sm', 'btn-agregar-carrito');
    boton.textContent    = 'Agregar al carrito';
    boton.dataset.id     = producto.id;
    boton.dataset.nombre = producto.nombre;
    boton.dataset.precio = producto.precio;

    pie.appendChild(precio);
    pie.appendChild(boton);
    body.appendChild(badge);
    body.appendChild(titulo);
    body.appendChild(desc);
    body.appendChild(pie);
    card.appendChild(img);
    card.appendChild(body);
    col.appendChild(card);

    return col;
}


// Evento click: agrega un producto al carrito
function inicializarCarrito() {
    document.querySelectorAll('.btn-agregar-carrito').forEach(boton => {
        boton.addEventListener('click', () => {
            const nombre = boton.dataset.nombre;
            const precio = parseFloat(boton.dataset.precio);

            carrito.push({ nombre, precio });
            totalCarrito += precio;

            actualizarResumenCarrito();
            mostrarNotificacion(`✅ "${nombre}" agregado al carrito`);

            const badge = document.getElementById('contador-carrito');
            badge.textContent = carrito.length;
            badge.classList.remove('d-none');
        });
    });
}


// Actualiza la sección de resumen del carrito
function actualizarResumenCarrito() {
    const lista   = document.getElementById('lista-carrito');
    const total   = document.getElementById('total-carrito');
    const seccion = document.getElementById('resumen-carrito');

    seccion.classList.remove('d-none');
    lista.innerHTML = '';

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between');
        li.innerHTML = `<span>${item.nombre}</span><strong>$${item.precio.toLocaleString('es-CL')}</strong>`;
        lista.appendChild(li);
    });

    total.textContent = `Total: $${totalCarrito.toLocaleString('es-CL')}`;
}


// Evento mouseover: resalta la card al pasar el cursor
function inicializarHoverCards() {
    document.querySelectorAll('.card-producto').forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.borderColor = '#ff6b35';
            card.style.boxShadow   = '0 6px 20px rgba(255, 107, 53, 0.35)';
            card.style.transform   = 'translateY(-4px)';
            card.style.transition  = 'all 0.3s ease';
        });
        card.addEventListener('mouseout', () => {
            card.style.borderColor = '';
            card.style.boxShadow   = '';
            card.style.transform   = '';
        });
    });
}


// Evento submit: filtra productos por nombre o categoría
function inicializarBuscador() {
    const form = document.getElementById('form-busqueda');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        const termino  = document.getElementById('input-busqueda').value.trim().toLowerCase();
        const resultado = todosLosProductos.filter(p =>
            p.nombre.toLowerCase().includes(termino) ||
            p.categoria.toLowerCase().includes(termino)
        );

        renderizarProductos(resultado);

        const info = document.getElementById('info-busqueda');
        info.textContent = termino
            ? `${resultado.length} resultado(s) para "${termino}"`
            : '';
    });
}


// Filtra por categoría desde los links del navbar
function inicializarCategorias() {
    document.querySelectorAll('[data-categoria]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const cat = link.dataset.categoria;

            // Limpia el buscador al cambiar de categoría
            document.getElementById('input-busqueda').value = '';
            document.getElementById('info-busqueda').textContent = '';

            const resultado = cat === 'todos'
                ? todosLosProductos
                : todosLosProductos.filter(p => p.categoria === cat);

            renderizarProductos(resultado);
        });
    });
}


// Toast reutilizable para notificaciones
function mostrarNotificacion(mensaje) {
    document.getElementById('toast-mensaje').textContent = mensaje;
    const toast = new bootstrap.Toast(document.getElementById('toast-carrito'), { delay: 3000 });
    toast.show();
}


// Muestra un mensaje de error amigable en el contenedor
function mostrarError(mensaje) {
    document.getElementById('contenedor-productos').innerHTML = `
        <div class="alert alert-warning w-100 text-center" role="alert">
            ⚠️ ${mensaje}
        </div>
    `;
}


// Punto de entrada: espera que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    inicializarBuscador();
    inicializarCategorias();
});
