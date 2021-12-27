import React, { useContext, useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { LOGIN } from '../../../action-types'
import { AuthContext } from '../../../App'
import { apiUrl } from '../../../utils/api-url'
import './style.scss'

function Register() {

    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const initialState = {
        nickname: '',
        email: '',
        password: '',
        isSubmitting: false,
        errorMessage: null
    }

    const [data, setData] = useState(initialState)

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    // Envia los datos a la API
    const handleFormSubmit = () => {
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        })

        // Llamada al endpoint de register
        fetch(apiUrl('register'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: data.nickname,
                email: data.email,
                password: data.password
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        }).then(data => {
            // Si se ejecuto todo OK, emite dispatch de tipo login con los datos que vienen de la API
            dispatch({
                type: LOGIN,
                payload: data
            })
            navigate('/select-oponent')
        }).catch(error => {
            console.error(error)
            setData({
                ...data,
                isSubmitting: false,
                errorMessage: 'Invalid credentials'
            })
        })
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className='register-container'>
                        <h1>Register</h1>
                        <div className='separator'></div>
                        <p>
                            Register to RPS so you can create games, play with friends and have fun!
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

                        <label htmlFor='email'>
                            <input
                                type='email'
                                value={data.email}
                                onChange={handleInputChange}
                                name='email'
                                id='email'
                            />
                            Email *
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

                        {/* Si se estan enviando datos, se deshabilita el boton y se muestra mensaje de espera */}
                        <button onClick={handleFormSubmit} disabled={data.isSubmitting} className='primary-button'>
                            {data.isSubmitting ? ("Please wait...") : ("Register")}
                        </button>

                        {/* Si hay mensajes de error se muestram */}
                        {data.errorMessage && (
                            <span className='form-error'>{data.errorMessage}</span>
                        )}

                    </div>

                    <div className='links'>
                        <small>You already have an account? <Link to="/login">Login</Link></small>
                        <small><Link to="/">Back to landing</Link></small>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register