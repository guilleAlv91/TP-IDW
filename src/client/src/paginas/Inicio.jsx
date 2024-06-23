import { Link } from "react-router-dom";
import '../Inicio.css';

function Inicio() {
  return (
    <main>
      <section className="inicio">
        <img src="img/principal.jpg" alt="Imagen Principal" />
        <div className="bloque-inicio">
          <h1>Encuentra tu destino, nosotros tu alojamiento</h1>
          <div className="formulario">
            <div className="campo">
              <label htmlFor="tipo">Alojamientos</label>
              <select id="tipo_alojamiento" name="tipo_alojamiento" required>
                <option value="">Seleccione el tipo</option>
                <option value="casa">Casa</option>
                <option value="departamentos">Departamentos</option>
                <option value="hotel">Hotel</option>
              </select>
            </div>
            <div className="campo">
              <label htmlFor="llegada">Llegada</label>
              <input type="date" id="llegada" />
            </div>
            <div className="campo">
              <label htmlFor="salida">Salida</label>
              <input type="date" id="salida" />
            </div>
            <div className="campo">
              <label htmlFor="rango_precios">Rango de Precios</label>
              <input type="range" id="rango_precios" name="rango_precios" />
            </div>
            <div className="campo">
              <label htmlFor="dormitorios">Cantidad de dormitorios</label>
              <input type="number" id="personas" placeholder="Dormitorios" />
            </div>
            <div className="campo">
              <label htmlFor="baños">Cantidad de baños</label>
              <input type="number" id="personas" placeholder="Baños" />
            </div>
            <button type="submit">Buscar</button>
          </div>
        </div>
      </section>
      <section className="galeria">
        <div className="alojamiento">
          <a href=""><img src="img/alojamiento.jpg" alt="Alojamiento 1" /></a>
          <a href="">Jundiaí, Brasil</a>
          <h5>2 huéspedes 1 dormitorio 1 cama 1 baño</h5>
          <h4>168 USD noche</h4>
        </div>
        <div class="alojamiento">
        <a href=""><img src="img/alojamiento2.jpg" alt="Alojamiento 2" /></a>
          <a href="">San Nicolas, Argentina</a>
          <h5>2 huéspedes 1 dormitorio 1 cama 1,5 baños</h5>
          <h4>45 USD noche</h4>
        </div>
        <div class="alojamiento">
        <a href=""><img src="img/alojamiento3.jpg" alt="Alojamiento 3" /></a>
          <a href="">Kittilä, Finlandia</a>
          <h5>7 huéspedes 4 dormitorios 6 camas 1,5 baños</h5>
          <h4>141 USD noche</h4>
        </div>
        <div class="alojamiento">
          <a href=""><img src="img/alojamiento4.jpg" alt="Alojamiento 4" /></a>
          <a href="">Cartagena, Colombia</a>
          <h5>6 huéspedes 3 dormitorios 4 camas 3,5 baños</h5>
          <h4>1.960 USD noche</h4>
        </div>
        <div class="alojamiento">
          <a href=""><img src="img/alojamiento5.jpg" alt="Alojamiento 5" /></a>
          <a href="">Carmelo, Uruguay</a>
          <h5>6 huéspedes 2 dormitorios 5 camas 1,5 baños</h5>
          <h4>120 USD noche</h4>
        </div>
        <div class="alojamiento">
        <a href=""><img src="img/alojamiento6.jpg" alt="Alojamiento 6" /></a>
          <a href="">Puerto Escondido, México</a>
          <h5>4 huéspedes 2 dormitorios 2 camas 2,5 baños</h5>
          <h4>389 USD noche</h4>
        </div>
        <div class="alojamiento">
          <a href=""><img src="img/alojamiento7.jpg" alt="Alojamiento 7" /></a>
          <a href="">Tigre, Argentina</a>
          <h5>4 huéspedes 2 dormitorios 3 camas 1 baño</h5>
          <h4>34 USD noche</h4>
        </div>
        <div class="alojamiento">
          <a href=""><img src="img/alojamiento8.jpg" alt="Alojamiento 8" /></a>
          <a href="">Río de Baza, España</a>
          <h5>6 huéspedes 1 dormitorio 3 camas 1 baño</h5>
          <h4>187 USD noche</h4>
        </div>
      </section>
    </main>
  );
}

export default Inicio;
