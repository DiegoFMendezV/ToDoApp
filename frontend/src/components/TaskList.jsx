import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        await axios.delete(`${url}/task/${id}`);
        fetchTasks();
    };

    return (
        <div className='container'>
            <h1>Gestor de Tareas</h1>
            <div className='d-grid gap-2'>
                <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Crear</Link>
            </div>
            <table className='table table-striped'>
                <thead className='bg-primary text-white'>
                    <tr>
                        <th>Nombre</th>
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
                                <Link to={`/edit/${task.id}`} className='btn btn-warning'>Editar</Link>
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
