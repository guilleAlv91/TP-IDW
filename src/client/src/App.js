import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Inicio from "./paginas/Inicio";
import Institucional from "./paginas/Institucional";
import Contacto from "./paginas/Contacto";
import Nav from "./componentes/Nav";
import Footer from "./componentes/Footer";
import AddTipoAlojamiento from "./form/AddTipoAlojamiento";  
import AddAlojamiento from "./form/AddAlojamiento";  
import AddServicio from "./form/AddServicio";  
import AddImagenes from "./form/AddImagenes";  
import AddAlojamientoServicios from "./form/AddAlojamientoServicios";


function App() {
  return (
    <div className="Aplicacion">
      <Nav />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Institucional" element={<Institucional />} />
        <Route path="/Contacto" element={<Contacto />} />
        <Route path="/tipoAlojamiento" element={<AddTipoAlojamiento />} /> 
        <Route path="/alojamiento" element={<AddAlojamiento />} />
        <Route path="/servicios" element={<AddServicio />} />
        <Route path="/alojamientoServicios" element={<AddAlojamientoServicios />} />
        <Route path="/imagenes" element={<AddImagenes />} />
      </Routes>
      <Footer /> 
    </div>
  );
}

export default App;
