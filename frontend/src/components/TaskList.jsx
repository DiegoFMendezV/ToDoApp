import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './estilos.css'
import {Link} from 'react-router-dom'

const url = 'http://localhost:8000/api'

const TaskList = () => {
    const [tasks, setTasks] = useState([])
    useEffect ( ()=> {
        fetchTasks()
    }, [])
    
    const fetchTasks = async () => {
        const response = await axios.get(`${url}/tasks`);
        setTasks(response.data);
    };

    const handleDelete = async (id) => {
        const confirmation = window.confirm('¿Estás seguro de que deseas eliminar esta tarea?');
        if (confirmation) {
            await axios.delete(`${url}/task/${id}`);
            fetchTasks();
        } else {
            alert('La tarea no fue eliminada.');
        }
    };

    return (
        <div className='container'>
            <h1 className='title'>Gestor de Tareas</h1>
            <div className='btnCrear d-grid gap-2'>
                <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Crear Nueva Tarea</Link>
            </div>
            <table className='table table-striped table-bordered'>
                <thead className='bg-primary text-white'>
                    <tr>
                        <th>Nombre Tarea</th>
                        <th>Descripcion</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { tasks.map( (task) =>(
                        <tr key={task.id}>
                            <td>{task.nombre}</td>
                            <td>{task.descripcion}</td>
                            <td>{task.estado}</td>
                            <td>
                                <Link to={`/edit/${task.id}`} className='btnEdit btn btn-warning'>Editar</Link>
                                <button onClick={ ()=>handleDelete(task.id) } className='btn btn-danger'>Eliminar</button>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
