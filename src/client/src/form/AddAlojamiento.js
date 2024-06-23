import React, { useState, useEffect } from 'react';
import './alojamiento.css';

const Alojamiento = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripción] = useState('');
    const [tipoAlojamiento, setTipoAlojamiento] = useState('');
    const [tiposAlojamiento, setTiposAlojamiento] = useState([]);
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [precioPorDia, setPrecioPorDia] = useState('');
    const [cantidadDormitorios, setCantidadDormitorios] = useState('');
    const [cantidadBanios, setCantidadBanios] = useState('');
    const [estado, setEstado] = useState('');
    const [alojamientos, setAlojamientos] = useState([]);
    const [editando, setEditando] = useState(false);
    const [idEditando, setIdEditando] = useState(null);

    useEffect(() => {
        fetchTiposAlojamientos();
        fetchAlojamientos();
    }, []);

    const fetchTiposAlojamientos = async () => {
        try {
            const response = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
            if (response.ok) {
                const data = await response.json();
                setTiposAlojamiento(data);
            } else {
                console.error('Error al obtener tipo de alojamiento');
            }
        } catch (error) {
            console.error('Error al conectarse con la API', error);
            alert('Error al conectarse con la API');
        }
    };

    const fetchAlojamientos = async () => {
        try {
            const response = await fetch('http://localhost:3001/alojamiento/getAlojamientos');
            if (response.ok) {
                const data = await response.json();
                setAlojamientos(data);
            } else {
                console.error('Error al obtener los alojamientos');
            }
        } catch (error) {
            console.error('Error al conectarse con la API', error);
            alert('Error al conectarse con la API');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            Titulo: titulo,
            Descripcion: descripcion,
            Latitud: parseFloat(latitud),
            Longitud: parseFloat(longitud),
            PrecioPorDia: parseFloat(precioPorDia),
            CantidadDormitorios: parseInt(cantidadDormitorios, 10),
            CantidadBanios: parseInt(cantidadBanios, 10),
            Estado: estado,
            TipoAlojamiento: tipoAlojamiento
        };

        const url = editando
            ? `http://localhost:3001/alojamiento/putAlojamiento/${idEditando}`
            : 'http://localhost:3001/alojamiento/createAlojamiento';

        const method = editando ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert(`Alojamiento ${editando ? 'actualizado' : 'creado'} exitosamente`);
                resetForm();
                fetchAlojamientos();
            } else {
                console.error(`Error al ${editando ? 'actualizar' : 'crear'} el alojamiento`);
                alert(`Error al ${editando ? 'actualizar' : 'crear'} el alojamiento`);
            }
        } catch (error) {
            console.error('Error al conectarse con la API', error);
            alert('Error al conectarse con la API');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar este alojamiento?')) {
            try {
                const response = await fetch(`http://localhost:3001/alojamiento/deleteAlojamiento/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Alojamiento eliminado exitosamente');
                    fetchAlojamientos();
                } else {
                    alert('No se pudo eliminar el alojamiento');
                }
            } catch (error) {
                console.error('Error al conectarse con la API', error);
                alert('Error al conectarse con la API');
            }
        }
    };

    const editarAlojamiento = (alojamiento) => {
        setTitulo(alojamiento.Titulo);
        setDescripción(alojamiento.Descripcion);
        setTipoAlojamiento(alojamiento.TipoAlojamiento);
        setLatitud(alojamiento.Latitud);
        setLongitud(alojamiento.Longitud);
        setPrecioPorDia(alojamiento.PrecioPorDia);
        setCantidadDormitorios(alojamiento.CantidadDormitorios);
        setCantidadBanios(alojamiento.CantidadBanios);
        setEstado(alojamiento.Estado);
        setEditando(true);
        setIdEditando(alojamiento.idAlojamiento);
    };

    const resetForm = () => {
        setTitulo('');
        setDescripción('');
        setTipoAlojamiento('');
        setLatitud('');
        setLongitud('');
        setPrecioPorDia('');
        setCantidadDormitorios('');
        setCantidadBanios('');
        setEstado('');
        setEditando(false);
        setIdEditando(null);
    };

    return (
        <div className="background">
            <img src="img/fondoTiposAlojamientos.jpg" alt="Imagen tipos" />
            <div className="content">
                <div className="formAlojamiento">
                    <h1>{editando ? 'Editar Alojamiento' : 'Nuevo Alojamiento'}</h1>
                    <form onSubmit={handleSubmit} className="alojamientos">
                        <div>
                            <label htmlFor="titulo">Titulo</label>
                            <input
                                type="text"
                                id="titulo"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="descripcion">Descripción</label>
                            <input
                                type="text"
                                id="descripcion"
                                value={descripcion}
                                onChange={(e) => setDescripción(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="tipoAlojamiento">Tipo Alojamiento</label>
                            <select
                                id="tipoAlojamiento"
                                value={tipoAlojamiento}
                                onChange={(e) => setTipoAlojamiento(e.target.value)}
                            >
                                <option value="">Tipo de alojamiento</option>
                                {tiposAlojamiento.map((tipo) => (
                                    <option key={tipo.id} value={tipo.id}>
                                        {tipo.Descripcion}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="latitud">Latitud</label>
                            <input
                                type="text"
                                id="latitud"
                                value={latitud}
                                onChange={(e) => setLatitud(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="longitud">Longitud</label>
                            <input
                                type="text"
                                id="longitud"
                                value={longitud}
                                onChange={(e) => setLongitud(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="precioPorDia">Precio por día</label>
                            <input
                                type="number"
                                id="precioPorDia"
                                value={precioPorDia}
                                onChange={(e) => setPrecioPorDia(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="cantidadDormitorios">Cantidad Dormitorios</label>
                            <input
                                type="number"
                                id="cantidadDormitorios"
                                value={cantidadDormitorios}
                                onChange={(e) => setCantidadDormitorios(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="cantidadBanios">Cantidad Baños</label>
                            <input
                                type="number"
                                id="cantidadBanios"
                                value={cantidadBanios}
                                onChange={(e) => setCantidadBanios(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="estado">Estado</label>
                            <select
                                id="estado"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                            >
                                <option value="Disponible">Disponible</option>
                                <option value="Reservado">Reservado</option>
                            </select>
                        </div>
                        <button type="submit">{editando ? 'Actualizar' : 'Agregar'}</button>
                        {editando && <button onClick={resetForm}>Cancelar</button>}
                    </form>
                </div>
                <div className='alojamientosTabla'></div>
                    <div className="tabla-alojamiento">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Descripció</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                             {alojamientos.map((alojamiento) => (
                                <tr  key={alojamiento.idAlojamiento}>
                                    <td>{alojamiento.Titulo}</td>
                                    <td>{alojamiento.Descripcion}</td>
                                    <td>{alojamiento.Estado}</td>
                                    <td>
                                        <button onClick={() => editarAlojamiento(alojamiento)}>Editar</button>
                                        <button onClick={() => handleDelete(alojamiento.idAlojamiento)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>    
        </div>
    );
};

export default Alojamiento;
