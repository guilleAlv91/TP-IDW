import React, { useState, useEffect } from 'react';
import './imagenes.css';

const Imagenes = () => {
    const [rutaArchivo, setRutaArchivo] = useState('');
    const [idAlojamiento, setIdAlojamiento] = useState('');
    const [imagenes, setImagenes] = useState([]);
    const [alojamientos, setAlojamientos] = useState([]);
    const [editando, setEditando] = useState(false);
    const [idEditando, setIdEditando] = useState(null);

    const enviar = async (e) => {
        e.preventDefault();

        const json = {
            idAlojamiento,
            RutaArchivo: rutaArchivo,
        };

        if (editando) {
            try {
                const response = await fetch(`http://localhost:3001/imagen/updateImagen/${idEditando}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(json),
                });

                if (response.ok) {
                    alert('Imagen actualizada correctamente');
                    setEditando(false);
                    setIdEditando(null);
                    setIdAlojamiento('');
                    setRutaArchivo('');
                    fetchData();
                } else {
                    alert('No se pudo actualizar la imagen');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error al actualizar la imagen');
            }
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/imagen/createImagen', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(json),
            });

            if (response.ok) {
                alert('Imagen creada correctamente');
                setIdAlojamiento('');
                setRutaArchivo('');
                fetchData();
            } else {
                console.error('Error: ', response.statusText);
                alert('Error al crear la imagen');
            }
        } catch (error) {
            console.error('Error: ', error);
            alert('No se pudo establecer el servicio');
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/imagen/getAllImagenes');
            if (!response.ok) {
                throw new Error('No se pudo obtener la información de las imágenes');
            }
            const data = await response.json();
            setImagenes(data);
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al obtener las imágenes');
        }
    };

    const fetchAlojamientos = async () => {
        try {
            const response = await fetch('http://localhost:3001/alojamiento/getAlojamientos');
            if (response.ok) {
                const data = await response.json();
                setAlojamientos(Array.isArray(data) ? data : []);
            } else {
                console.error('Error al obtener tipo de alojamiento');
            }
        } catch (error) {
            console.error('Error al conectarse con la API', error);
            alert('Error al conectarse con la API');
        }
    };

    useEffect(() => {
        fetchData();
        fetchAlojamientos();
    }, []);

    const editarImagen = (id, idAlojamiento, rutaArchivo) => {
        setIdAlojamiento(idAlojamiento);
        setRutaArchivo(rutaArchivo);
        setEditando(true);
        setIdEditando(id);
    };

    const eliminarImagen = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar esta imagen?')) {
            try {
                const response = await fetch(`http://localhost:3001/imagen/deleteImagen/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Imagen eliminada correctamente');
                    fetchData();
                } else {
                    alert('No se pudo eliminar la imagen');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error al eliminar la imagen');
            }
        }
    };

    return (
        <div className="background">
            <img src="img/fondoTiposAlojamientos.jpg" alt="Imagen tipos" />
            <div className="content">
                <div className="formImagenes">
                    <h1>{editando ? 'Editar Imagen' : 'Nueva Imagen'}</h1>
                    <form onSubmit={enviar} className="imagenes">
                        <div>
                            <label htmlFor="idAlojamiento">ID Alojamiento</label>
                            <select
                                id="idAlojamiento"
                                value={idAlojamiento}
                                onChange={(e) => setIdAlojamiento(e.target.value)}
                            >
                                <option value="">Seleccione un Alojamiento</option>
                                {alojamientos.map((alojamiento) => (
                                    <option key={alojamiento.idAlojamiento} value={alojamiento.idAlojamiento}>
                                        {alojamiento.Descripcion}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="rutaArchivo">Ruta Archivo</label>
                            <input
                                type="text"
                                id="rutaArchivo"
                                value={rutaArchivo}
                                onChange={(e) => setRutaArchivo(e.target.value)}
                            />
                        </div>
                        <button type="submit">{editando ? 'Actualizar' : 'Enviar'}</button>
                    </form>
                </div>    
                <div className="tablaImagenes">
                    <h2>Lista de Imágenes</h2>
                    <div className="tabla-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID Imagen</th>
                                    <th>ID Alojamiento</th>
                                    <th>Ruta Archivo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {imagenes.map((imagen) => (
                                    <tr key={imagen.idImagen}>
                                        <td>{imagen.idImagen}</td>
                                        <td>{imagen.idAlojamiento}</td>
                                        <td>{imagen.RutaArchivo}</td>
                                        <td>
                                            <button onClick={() => editarImagen(imagen.idImagen, imagen.idAlojamiento, imagen.RutaArchivo)}>Editar</button>
                                            <button onClick={() => eliminarImagen(imagen.idImagen)}>Eliminar</button>
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

export default Imagenes;

