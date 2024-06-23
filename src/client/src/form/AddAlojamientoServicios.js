import React, { useState, useEffect } from 'react';
import './alojamientosServicios.css';

const AlojamientosServicios = () => {
    const [idAlojamiento, setIdAlojamiento] = useState('');
    const [idServicio, setIdServicio] = useState('');
    const [alojamientosServicios, setAlojamientosServicios] = useState([]);
    const [alojamientos, setAlojamientos] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [editando, setEditando] = useState(false);
    const [idEditando, setIdEditando] = useState(null);

    const enviar = async (e) => {
        e.preventDefault();

        const json = {
            idAlojamiento,
            idServicio,
        };

        if (editando) {
            try {
                const response = await fetch(`http://localhost:3001/alojamientosServicios/updateAlojamientoServicio/${idEditando}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(json),
                });

                if (response.ok) {
                    alert('Relación actualizada correctamente');
                    setEditando(false);
                    setIdEditando(null);
                    setIdAlojamiento('');
                    setIdServicio('');
                    fetchData();
                } else {
                    alert('No se pudo actualizar la relación');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error al actualizar la relación');
            }
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/alojamientosServicios/createAlojamientoServicio', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(json),
            });

            if (response.ok) {
                alert('Relación creada correctamente');
                setIdAlojamiento('');
                setIdServicio('');
                fetchData();
            } else {
                console.error('Error: ', response.statusText);
                alert('Error al crear la relación');
            }
        } catch (error) {
            console.error('Error: ', error);
            alert('No se pudo establecer el servicio');
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/alojamientosServicios/getAllAlojamientoServicios');
            if (!response.ok) {
                throw new Error('No se pudo obtener la información de las relaciones');
            }
            const data = await response.json();
            setAlojamientosServicios(data);
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al obtener las relaciones');
        }
    };

    const fetchAlojamientos = async () => {
        try {
            const response = await fetch('http://localhost:3001/alojamiento/getAlojamientos');
            if (response.ok) {
                const data = await response.json();
                setAlojamientos(Array.isArray(data) ? data : []);
            } else {
                console.error('Error al obtener los alojamientos');
            }
        } catch (error) {
            console.error('Error al conectarse con la API', error);
            alert('Error al conectarse con la API');
        }
    };

    const fetchServicios = async () => {
        try {
            const response = await fetch('http://localhost:3001/servicio/getAllServicios');
            if (response.ok) {
                const data = await response.json();
                setServicios(Array.isArray(data) ? data : []);
            } else {
                console.error('Error al obtener los servicios');
            }
        } catch (error) {
            console.error('Error al conectarse con la API', error);
            alert('Error al conectarse con la API');
        }
    };

    useEffect(() => {
        fetchData();
        fetchAlojamientos();
        fetchServicios();
    }, []);

    const editarRelacion = (id, idAlojamiento, idServicio) => {
        setIdAlojamiento(idAlojamiento);
        setIdServicio(idServicio);
        setEditando(true);
        setIdEditando(id);
    };

    const eliminarRelacion = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar esta relación?')) {
            try {
                const response = await fetch(`http://localhost:3001/alojamientosServicios/deleteAlojamientoServicio/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Relación eliminada correctamente');
                    fetchData();
                } else {
                    alert('No se pudo eliminar la relación');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error al eliminar la relación');
            }
        }
    };

    return (
        <div className="background">
            <img src="img/fondoTiposAlojamientos.jpg" alt="Imagen tipos" />
            <div className="content">
                <div className="formAlojamientoServicios">
                    <h1>{editando ? 'Editar Relación' : 'Nueva Relación'}</h1>
                    <form onSubmit={enviar} className="alojamientoServicios">
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
                            <label htmlFor="idServicio">ID Servicio</label>
                            <select
                                id="idServicio"
                                value={idServicio}
                                onChange={(e) => setIdServicio(e.target.value)}
                            >
                                <option value="">Seleccione un Servicio</option>
                                {servicios.map((servicio) => (
                                    <option key={servicio.idServicio} value={servicio.idServicio}>
                                        {servicio.Nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit">{editando ? 'Actualizar' : 'Enviar'}</button>
                    </form>
                </div>

                <div className="tablaRelaciones">
                    <h2>Lista de Relaciones</h2>
                    <div className="tabla-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID Relación</th>
                                    <th>ID Alojamiento</th>
                                    <th>ID Servicio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alojamientosServicios.map((relacion) => (
                                    <tr key={relacion.idAlojamientoServicio}>
                                        <td>{relacion.idAlojamientoServicio}</td>
                                        <td>{relacion.idAlojamiento}</td>
                                        <td>{relacion.idServicio}</td>
                                        <td>
                                            <button onClick={() => editarRelacion(relacion.idAlojamientoServicio, relacion.idAlojamiento, relacion.idServicio)}>Editar</button>
                                            <button onClick={() => eliminarRelacion(relacion.idAlojamientoServicio)}>Eliminar</button>
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

export default AlojamientosServicios;
