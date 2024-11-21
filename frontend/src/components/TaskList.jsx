import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchTasks = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/tasks');
        setTasks(response.data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`);
        fetchTasks();
    };

    const handleSave = () => {
        fetchTasks();
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <button onClick={() => { setIsModalOpen(true); setSelectedTask(null); }}>Nueva Tarea</button>
            {isModalOpen && (
                <TaskForm task={selectedTask} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
            )}
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.nombre}</td>
                            <td>{task.descripcion}</td>
                            <td>{task.estado ? 'Completo' : 'Pendiente'}</td>
                            <td>
                                <button onClick={() => { setSelectedTask(task); setIsModalOpen(true); }}>Editar</button>
                                <button onClick={() => handleDelete(task.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
