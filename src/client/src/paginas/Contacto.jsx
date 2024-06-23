import React, { useState, useEffect } from 'react';
import '../Contacto.css';

function Contacto() {
  const [contactoArray, setContactoArray] = useState([]);
  const [contacto, setContacto] = useState({
    apellido: "",
    nombre: "",
    email: "",
    mensaje: ""
  });

  useEffect(() => {
    let lsContacto = JSON.parse(localStorage.getItem("contactos"));
    if (!lsContacto) {
      lsContacto = [];
    }
    setContactoArray(lsContacto);
  }, []);

  const enviarForm = (e) => {
    e.preventDefault();
    alert(`Datos enviados:\nNombre: ${contacto.nombre}\nApellido: ${contacto.apellido}\nEmail: ${contacto.email}\nMensaje: ${contacto.mensaje}`);
    let lsContacto = [];
    if (localStorage.getItem("contactos")) {
      lsContacto = JSON.parse(localStorage.getItem("contactos"));
    }
    lsContacto.push(contacto);
    localStorage.setItem("contactos", JSON.stringify(lsContacto));
    setContactoArray(lsContacto);
    setContacto({ apellido: "", nombre: "", email: "", mensaje: "" });
  };

  return (
    <main>
      <section className="contacto">
        <form className="formContacto" onSubmit={enviarForm}>
          <h1>CONTACTO</h1>
          <div className="datos">
            <label htmlFor="nombre">NOMBRE:</label>
            <input 
              type="text" 
              id="nombre" 
              value={contacto.nombre}
              onChange={(e) => setContacto({ ...contacto, nombre: e.target.value })}
              required
            />
          </div>
          <div className="datos">
            <label htmlFor="apellido">APELLIDO:</label>
            <input 
              type="text" 
              id="apellido" 
              value={contacto.apellido}
              onChange={(e) => setContacto({ ...contacto, apellido: e.target.value })}
              required
            />
          </div>
          <div className="datos">
            <label htmlFor="email">EMAIL:</label>
            <input 
              type="email" 
              id="email" 
              value={contacto.email}
              onChange={(e) => setContacto({ ...contacto, email: e.target.value })}
              required
            />
          </div>
          <div className="mensaje">
            <label htmlFor="mensaje">MENSAJE:</label>
            <textarea 
              id="mensaje" 
              cols="30" 
              rows="10" 
              value={contacto.mensaje}
              onChange={(e) => setContacto({ ...contacto, mensaje: e.target.value })}
              required
            />
          </div>
          <button type="submit">ENVIAR</button>
        </form>
        <div className="info">
          <h2>También puedes comunicarte con nosotros a través de:</h2>
          <div className="redes">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
          <div className="telefono">
            <i className="fas fa-phone"></i>
            <h5>0345-4258977</h5>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contacto;
