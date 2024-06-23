import React from 'react';
import '../Institucional.css';

const Institucional = () => {
  return (
    <section className="institucional">
      <h1>Nuestra Empresa IDW</h1>
      <div className="compromiso">
        <img src="img/institucional.jpg" alt="Imagen institucional" />
        <div className="subtitulo">
          <h2>Nuestro Compromiso</h2>
          <h3>En IDW, nos esforzamos por proporcionar:</h3>
          <div className="detalles">
            <div>
              <h4>VARIEDAD Y SELECCIÓN</h4>
              <h5>Nos asociamos con una amplia red de proveedores de alojamiento en todo el mundo para ofrecerte una amplia gama de opciones, desde lujosos hoteles hasta acogedores alojamientos locales.</h5>
            </div>
            <div>
              <h4>FACILIDAD DE USO</h4>
              <h5>Nuestra plataforma intuitiva y fácil de usar te permite buscar, comparar y reservar alojamientos de manera rápida y sencilla, adaptándonos a tus preferencias y necesidades específicas.</h5>
            </div>
            <div>
              <h4>ATENCIÓN PERSONALIZADA</h4>
              <h5>Valoramos a cada cliente y nos esforzamos por brindar un servicio personalizado y atención al cliente excepcional en cada paso del proceso de reserva.</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="servicios">
        <div className="subtitulo">
          <h2>Nuestros Servicios</h2>
          <div className="detalles">
            <div>
              <h4>BÚSQUEDA PERSONALIZADA</h4>
              <h5>Utiliza nuestras herramientas de búsqueda avanzada para encontrar el alojamiento ideal según tus preferencias de ubicación, presupuesto, comodidades y más.</h5>
            </div>
            <div>
              <h4>RESERVAS SEGURAS</h4>
              <h5>Reserva con confianza sabiendo que tus datos están seguros y que garantizamos las mejores tarifas disponibles para los alojamientos que ofrecemos.</h5>
            </div>
            <div>
              <h4>ASISTENCIA CONTINUA</h4>
              <h5>Nuestro compromiso no termina cuando haces una reserva. Estamos aquí para ayudarte antes, durante y después de tu estancia, asegurándonos de que tengas una experiencia sin problemas en todo momento.</h5>
            </div>
          </div>
        </div>
        <img src="img/institucional2.jpg" alt="Imagen institucional 2" />
      </div>
    </section>
  );
};

export default Institucional;