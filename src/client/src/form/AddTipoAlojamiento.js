import React, { useState, useEffect } from 'react';
import './tipoAlojamiento.css';

const TiposAlojamiento = () => {
  const [descripcion, setDescripcion] = useState('');
  const [tiposAlojamiento, setTiposAlojamiento] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const enviar = async (e) => {
    e.preventDefault();

    const descripcionMayusculas = descripcion.toUpperCase();

    if (editando) {
      try {
        const response = await fetch(`http://localhost:3001/tiposAlojamiento/putTipoAlojamiento/${idEditando}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Descripcion: descripcionMayusculas }),
        });

        if (response.ok) {
          alert('Tipo de alojamiento actualizado correctamente');
          setEditando(false);
          setIdEditando(null);
          setDescripcion('');
          fetchData();
        } else {
          alert('No se pudo actualizar el tipo de alojamiento');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al actualizar el tipo de alojamiento');
      }
      return;
    }

    const tiposAlojamiento = await obtenerTiposAlojamiento();
    const tipoExistente = tiposAlojamiento.find((tipo) => tipo.Descripcion === descripcionMayusculas);
    if (tipoExistente) {
      alert('Ya existe un tipo de alojamiento con esa descripción');
      return;
    }

    const json = {
      Descripcion: descripcionMayusculas,
    };

    try {
      const response = await fetch('http://localhost:3001/tiposAlojamiento/createTipoAlojamiento', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(json),
      });

      if (response.ok) {
        alert('Se creó correctamente el tipo de alojamiento');
        setDescripcion('');
        fetchData(); 
      } else {
        console.error('Error: ', response.statusText);
        alert('Error al crear el tipo de alojamiento');
      }
    } catch (error) {
      console.error('Error: ', error);
      alert('No se pudo establecer el servicio');
    }
  };

  const obtenerTiposAlojamiento = async () => {
    try {
      const response = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
      if (!response.ok) {
        throw new Error('No se pudo obtener la información de tipos de alojamiento');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al obtener los tipos de alojamiento');
      return [];
    }
  };

  const fetchData = async () => {
    const data = await obtenerTiposAlojamiento();
    setTiposAlojamiento(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const editarTipoAlojamiento = (id, descripcion) => {
    setDescripcion(descripcion);
    setEditando(true);
    setIdEditando(id);
  };

  const eliminarTipoAlojamiento = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este tipo de alojamiento?')) {
      try {
        const response = await fetch(`http://localhost:3001/tiposAlojamiento/deleteTipoAlojamiento/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Tipo de alojamiento eliminado correctamente');
          fetchData();
        } else {
          alert('No se pudo eliminar el tipo de alojamiento');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al eliminar el tipo de alojamiento');
      }
    }
  };

  return (
    <div className="background">
      <img src="img/fondoTiposAlojamientos.jpg" alt="Imagen tipos" />
      <div className="content">
        <div className="formTipoAlojamiento">
          <h1>{editando ? 'Editar tipo de alojamiento' : 'Alta tipo alojamiento'}</h1>
          <form onSubmit={enviar} className="tipos">
            <div className="form-group">
              <label htmlFor="descripcion">Descripción:</label>
              <input
                type="text"
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
            <button type="submit">{editando ? 'Actualizar' : 'Enviar'}</button>
          </form>
        </div>
        <div className="tablaAlojamientos">
          <h2>Lista de Tipos de Alojamiento</h2>
          <div className="tabla-scroll">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tiposAlojamiento.map((tipo) => (
                  <tr key={tipo.idTipoAlojamiento}>
                    <td>{tipo.idTipoAlojamiento}</td>
                    <td>{tipo.Descripcion}</td>
                    <td>
                      <button onClick={() => editarTipoAlojamiento(tipo.idTipoAlojamiento, tipo.Descripcion)}>
                        Editar
                      </button>
                      <button onClick={() => eliminarTipoAlojamiento(tipo.idTipoAlojamiento)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiposAlojamiento;
