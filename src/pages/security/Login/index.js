import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ExclamationCircle } from 'react-bootstrap-icons'

import { LOGIN } from '../../../action-types'
import { AuthContext } from '../../../App'
import { apiUrl } from '../../../utils/api-url'
import './style.scss'

function Login() {

    // Del contexto de autenticacion tomamos la funcion dispatch para indicar si ocurrio algun login
    const { dispatch } = useContext(AuthContext)

    const navigate = useNavigate()

    // Declaracion del estado inicial del usuario
    const initialState = {
        nickname: '',
        password: '',
        token: '',
        isSubmitting: false,
        errorMessage: null
    }

    // Seteo de estado inicial
    const [data, setData] = useState(initialState)

    // Actualiza todos los datos de estado de una sola vez
    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    // Envio de datos a la API
    const handleFormSubmit = () => {
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null  // Para que no se muestren mensajes de error durante la peticion
        })

        // Llamada al endpoint de login
        fetch(apiUrl('login'), {
            method: 'POST',
            headers: {
                // Declara el tipo de contenido que se envia a la API
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: data.nickname,
                password: data.password,
                token: data.token
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        }).then(data => {
            // Si todo se ejecuto OK, hace dispatch de login con los datos que vienen de la API
            dispatch({
                type: LOGIN,
                payload: data
            })
            // Luego de hacer el dispatch, navega a home
            navigate('/')
        }).catch(error => {
            console.error(error)
            setData({
                ...data,
                isSubmitting: false,
                errorMessage: 'Invalid credentials. Please check and try again.'
            })
        })
    }

    return (
        <main>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='login-container'>
                            <h1>User login</h1>
                            <div className='separator'></div>
                            <p>
                                Login to RPS so you can create games, play with friends and have fun!
                            </p>

                            <label htmlFor='nickname'>
                                <input
                                    type='text'
                                    value={data.nickname}
                                    onChange={handleInputChange}
                                    name='nickname'
                                    id='nickname'
                                />
                                Nickname *
                            </label>

                            <label htmlFor='password'>
                                <input
                                    type='password'
                                    value={data.password}
                                    onChange={handleInputChange}
                                    name='password'
                                    id='password'
                                />
                                Password *
                            </label>

                            <label htmlFor='token'>
                                <input
                                    type='password'
                                    value={data.token}
                                    onChange={handleInputChange}
                                    name='token'
                                    id='token'
                                />
                                Token (Only if you enabled MFA)
                            </label>

                            {/* Si se estan enviando datos, se deshabilita el boton y se muestra mensaje de espera */}
                            <button onClick={handleFormSubmit} disabled={data.isSubmitting} className='primary-button'>
                                {data.isSubmitting ? ("Please wait...") : ("Login")}
                            </button>

                            {data.errorMessage && (
                                <span className='error-message'>
                                    <ExclamationCircle />
                                    {data.errorMessage}
                                </span>
                            )}

                        </div>

                        <div className='links'>
                            <small>Don't yo have an account yet? <Link to="/register">Register</Link></small>
                            <small><Link to="/">Back to landing</Link></small>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login