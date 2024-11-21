
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ task, onSave, onClose }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('pendiente'); // Por defecto "pendiente"

    useEffect(() => {
        if (task) {
            setNombre(task.nombre);
            setDescripcion(task.descripcion);
            setEstado(task.estado); // Cargar el estado de la tarea existente
        }
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario
        const newTask = { nombre, descripcion, estado };
    
        try {
            if (task) {
                await axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}`, newTask);
            } else {
                const response = await axios.post('http://127.0.0.1:8000/api/tasks', newTask);
                console.log('Tarea guardada:', response.data); // Verifica la respuesta
            }
            onSave(); // Llamar a la función onSave después de guardar
        } catch (error) {
            console.error('Error al guardar la tarea:', error.response ? error.response.data : error.message);
            alert('Hubo un error al guardar la tarea. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                required
            />
            <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción"
                required
            />
            {/* Campo de estado oculto, pero se establece como "pendiente" por defecto */}
            <input type="hidden" value={estado} />
            {task && (
                <label>
                    Estado:
                    <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                        <option value="pendiente">Pendiente</option>
                        <option value="completada">Completada</option>
                    </select>
                </label>
            )}
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
        </form>
    );
};

export default TaskForm;
