import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const url = 'http://localhost:8000/api/task/'

const EditTask = () => {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [estado, setEstado] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        await axios.put(`${url}${id}`, {
            nombre: nombre,
            descripcion: descripcion,
            estado: estado
        })
        navigate('/')
    }

    useEffect( () => {
        const getTaskById = async () => {
            const response = await axios.get(`${url}${id}`)
            setNombre(response.data.nombre)
            setDescripcion(response.data.descripcion)
            setEstado(response.data.estado)
        }
        getTaskById()

    }, [id] )

  return (
    <div>
        <h3>Editar Tarea</h3>
        <form onSubmit={update}>
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
            <button type='submit' className='btn btn-primary'>Guardar</button>
        </form>
    </div>
  )
}

export default EditTask