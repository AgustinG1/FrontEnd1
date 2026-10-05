import { useEffect, useRef } from 'react';
import Carousel from 'bootstrap/js/dist/carousel';
import { assetUrl } from '../utils/format.js';

const slides = [
  { image: 'portada.png', title: 'The Legend of Adventures', description: 'Descubre tu próxima gran aventura.', alt: 'Setup gamer con monitor, teclado, control y auriculares' },
  { image: 'carreras-neon.png', title: 'Speed Racers X', description: 'Vive la emoción de la carrera.', alt: 'Auto de carreras futurista en una pista nocturna' },
  { image: 'control.jpg', title: 'Accesorios para jugar', description: 'Completa tu experiencia de juego.', alt: 'Control inalámbrico blanco sobre fondo amarillo' },
];

export default function FeaturedCarousel() {
  const carouselRef = useRef(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    const controller = new Carousel(carouselRef.current, { interval: 5000, pause: 'hover', ride: 'carousel' });
    controllerRef.current = controller;
    return () => { controller.dispose(); controllerRef.current = null; };
  }, []);

  return (
    <section aria-label="Videojuegos destacados">
      <div className="carousel slide" ref={carouselRef}>
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={slide.image}>
              <img src={assetUrl(`assets/img/${slide.image}`)} className="d-block w-100 carousel-img" alt={slide.alt} />
              <div className="carousel-caption"><h2 className="h4">{slide.title}</h2><p>{slide.description}</p></div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" onClick={() => controllerRef.current?.prev()}>
          <span className="carousel-control-prev-icon" aria-hidden="true" /><span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" onClick={() => controllerRef.current?.next()}>
          <span className="carousel-control-next-icon" aria-hidden="true" /><span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </section>
  );
}
