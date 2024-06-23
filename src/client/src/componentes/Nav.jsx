import React from 'react';
import { Link } from 'react-router-dom';
import '../Nav.css';

function Nav() {
  return (
    <nav>
      <ul>
        <li><img src="/img/logo.png" alt="Icono" className="nav-icon" /></li>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/institucional">Institucional</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li className="dropdown">
          <Link className="dropbtn">Administración</Link>
          <div className="dropdown-content">
            <Link to="/tipoAlojamiento">Tipo Alojamiento</Link>
            <Link to="/alojamiento">Alojamiento</Link>
            <Link to="/servicios">Servicios</Link>
            <Link to="/alojamientoServicios">Alojamiento Servicios</Link>
            <Link to="/imagenes">Imágenes</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
