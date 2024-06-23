import React, { useState, useEffect } from 'react';
import './servicios.css';  

const Servicios = () => {
  const [nombre, setNombre] = useState('');
  const [servicios, setServicios] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const enviar = async (e) => {
    e.preventDefault();

    const nombreMayusculas = nombre.toUpperCase();

    if (editando) {
      try {
        const response = await fetch(`http://localhost:3001/servicio/updateServicio/${idEditando}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre: nombreMayusculas }),
        });

        if (response.ok) {
          alert('Servicio actualizado correctamente');
          setEditando(false);
          setIdEditando(null);
          setNombre(''); 
          fetchData();
        } else {
          alert('No se pudo actualizar el servicio');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al actualizar el servicio');
      }
      return;
    }

    const servicios = await obtenerServicios();
    const tipoExistente = servicios.find((tipo) => tipo.nombre === nombreMayusculas);
    if (tipoExistente) {
      alert('Ya existe un servicio con esa descripción');
      return;
    }

    const json = {
      nombre: nombreMayusculas,
    };

    try {
      const response = await fetch('http://localhost:3001/servicio/createServicio', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(json),
      });

      if (response.ok) {
        alert('Se creó correctamente el servicio');
        setNombre(''); 
        fetchData(); 
      } else {
        console.error('Error: ', response.statusText);
        alert('Error al crear el servicio');
      }
    } catch (error) {
      console.error('Error: ', error);
      alert('No se pudo establecer el servicio');
    }
  };

  const obtenerServicios = async () => {
    try {
      const response = await fetch('http://localhost:3001/servicio/getAllServicios');
      if (!response.ok) {
        throw new Error('No se pudo obtener la información de los servicios');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al obtener los servicios');
      return [];
    }
  };

  const fetchData = async () => {
    const data = await obtenerServicios();
    setServicios(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const editarServicio = (id, nombre) => {
    setNombre(nombre);
    setEditando(true);
    setIdEditando(id);
  };

  const eliminarServicio = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este servicio?')) {
      try {
        const response = await fetch(`http://localhost:3001/servicio/deleteServicio/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Servicio eliminado correctamente');
          fetchData();
        } else {
          alert('No se pudo eliminar el servicio');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al eliminar el servicio');
      }
    }
  };

  return (
    <div className="background">
      <img src="img/fondoTiposAlojamientos.jpg" alt="Imagen tipos" />
      <div className="content">
        <div className="formServicios">
          <h1>{editando ? 'Editar servicio' : 'Alta servicio'}</h1>
          <form onSubmit={enviar} className="servicios">
            <div className="form-group">
              <label htmlFor="nombre">Servicio:</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <button type="submit">{editando ? 'Actualizar' : 'Enviar'}</button>
          </form>
        </div>
        <div className="tablaServicios">
          <h2>Lista de Servicios</h2>
          <div className="tabla-scroll">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map((tipo) => (
                  <tr key={tipo.idServicio}>
                    <td>{tipo.idServicio}</td>
                    <td>{tipo.Nombre}</td>
                    <td>
                      <button onClick={() => editarServicio(tipo.idServicio, tipo.Nombre)}>
                        Editar
                      </button>
                      <button onClick={() => eliminarServicio(tipo.idServicio)}>Eliminar</button>
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

export default Servicios;
