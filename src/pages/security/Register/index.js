import React, { useContext, useState } from 'react'
import { BoxArrowRight, ExclamationCircle } from 'react-bootstrap-icons'
import { useNavigate, Link } from "react-router-dom"

import { LOGIN, LOGOUT } from '../../../action-types'
import { AuthContext } from '../../../App'
import { apiUrl } from '../../../utils/api-url'
import './style.scss'

function Register() {

    const { state, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const initialState = {
        nickname: '',
        email: '',
        password: '',
        isSubmitting: false,
        errorMessage: null
    }

    const [data, setData] = useState(initialState)

    const logout = () => {
        dispatch({ type: LOGOUT })
        navigate('/logged-out')
    }

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
            navigate('/tutorial')
        }).catch(error => {
            console.error(error)
            setData({
                ...data,
                isSubmitting: false,
                errorMessage: 'Error creating your account. Please try other credentials.'
            })
        })
    }

    return (
        <main>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='register-container'>
                            <h1>Register</h1>
                            <div className='separator'></div>

                            {state.user ? (
                                <div className='text-center'>
                                    <h6>You are already logged in as {state.user.nickname}. </h6>
                                    <p>You need to log out before register as different user.</p>
                                    <button className='primary-button' onClick={logout}><BoxArrowRight />Logout</button>
                                </div>
                            ) : (
                                <p>Register to RPS so you can create games, play with friends and have fun!</p>
                            )}

                            {!state.user && (
                                <div className='form-container'>

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

                                    {data.errorMessage && (
                                        <span className='error-message'>
                                            <ExclamationCircle />
                                            {data.errorMessage}
                                        </span>
                                    )}

                                </div>
                            )}

                        </div>

                        {!state.user && (
                            <div className='links'>
                                <small>Do you already have an account? <Link to="/login">Login</Link></small>
                                <small><Link to="/">Back to landing</Link></small>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </main>
    )
}

export default Register