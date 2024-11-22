
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './estilos.css'

const url = 'http://localhost:8000/api/task'

const CreateTask = () => {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [estado, setEstado] = useState('')
    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault()
        await axios.post(url, {nombre: nombre, descripcion: descripcion, estado: estado})
        navigate('/')
    }

    return (
        <div className='container'>
            <h3 className='title'>Crear Tarea</h3>
            <form className='form' onSubmit={store}>
                <div className='mb-3'>
                    <label className="form-label">Nombre</label>
                    <input 
                        value={nombre}
                        onChange={ (e)=> setNombre(e.target.value)}
                        type="text"
                        className='form-control'
                        />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Descripcion</label>
                    <input 
                        value={descripcion}
                        onChange={ (e)=> setDescripcion(e.target.value)}
                        type="text"
                        className='form-control'
                        />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Estado</label>
                    <input 
                        value={estado}
                        onChange={ (e)=> setEstado(e.target.value)}
                        type="text"
                        className='form-control'
                        />
                </div>
                <button type='submit' className='btn btn-primary'>Crear</button>
            </form>
        </div>
    )
}

export default CreateTask