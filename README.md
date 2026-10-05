# GameZone — tienda de videojuegos en React

Proyecto académico de Front End I. Continúa la tienda de videojuegos y accesorios de las semanas anteriores, ahora con componentes funcionales, estado e interacción en React.

## Tecnologías

React, Vite, JavaScript, Bootstrap 5 y CSS propio con Flexbox, Grid y media queries. Los productos se obtienen desde un JSON local mediante `fetch`; no se necesita servidor de base de datos.

## Funcionalidades

- Catálogo dinámico con imagen, descripción, precio normal y precio de oferta.
- Buscador y filtros por categoría.
- Carrito agrupado por producto: aumentar, disminuir, quitar y vaciar.
- Contador de unidades, subtotales y total calculados desde el estado.
- Mensaje de carrito vacío y cambio del botón a «En el carrito».
- Indicador de carga y mensaje de error con botón para reintentar.
- Carrusel y navegación adaptables a móviles, tabletas y escritorio.
- Confirmación de compra **simulada**: no envía pedidos ni procesa pagos.

El carrito se conserva mientras la página está abierta; al recargar vuelve a estar vacío. Los precios de oferta son datos demostrativos.

## Ejecutar localmente

Requisitos: Node.js 24 LTS y npm.

```sh
npm install
npm run dev
```

Abre la dirección que indique Vite, incluyendo `/FrontEnd1/`. Por defecto: <http://localhost:5173/FrontEnd1/>. No uses Live Server ni abras `index.html` directamente: React necesita el servidor de Vite.

## Pruebas y versión de producción

```sh
npm test
npm run build
npm run preview
```

Las pruebas comprueban agrupación de productos, cantidades, eliminación y totales. `preview` permite revisar la compilación de producción; por defecto: <http://localhost:4173/FrontEnd1/>.

Verificación manual sugerida: agregar el mismo producto dos veces y otro distinto; cambiar cantidades; quitar y vaciar; buscar; filtrar; confirmar y cancelar la compra simulada. Repetir en vistas de 390, 768 y 1280 píxeles y comprobar que no haya desplazamiento horizontal ni imágenes rotas.

## Estructura

```text
public/
  productos.json          Datos cargados con fetch
  assets/img/             Imágenes locales
src/
  components/             Navegación, catálogo, tarjetas, carrito y confirmación
  utils/                  Formato de precios y operaciones del carrito
  App.jsx                 Estado general y carga de productos
  main.jsx                Entrada de React
  styles.css              Estilos y adaptación de pantallas
tests/cart.test.js        Pruebas de operaciones del carrito
vite.config.js            Configuración y ruta base para GitHub Pages
```

## Publicar en GitHub Pages

Repositorio: <https://github.com/AgustinG1/FrontEnd1>.
Sitio web: <https://agusting1.github.io/FrontEnd1/>.

```sh
npm run deploy
```

El comando primero genera `dist` y luego publica su contenido en la rama `gh-pages`. Requiere permiso de escritura en el repositorio. En GitHub → Settings → Pages, seleccionar la rama `gh-pages` y la carpeta raíz. El código fuente se guarda en `main`.
