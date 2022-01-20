import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, PersonFill } from 'react-bootstrap-icons'

import { refreshToken } from '../../../utils/refresh-token'
import { apiUrl } from '../../../utils/api-url'
import { AuthContext } from '../../../App'
import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from './action-types'
import { HIDE_LOADER, SHOW_LOADER } from '../../../action-types'

import NoOpponents from '../../../components/NoOpponents'
import PageTitle from '../../../components/PageTitle'
import UserCard from './components/UserCard'
import Loader from '../../../components/Loader'
import FetchError from '../../../components/FetchError'

// Creacion de contexto para los datos de usuarios
export const UsersContext = createContext()

// Estado inicial del componente
const initialState = {
    users: [],
    isFetching: false,
    hasError: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                isFetching: true,
                hasError: false
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                users: action.payload.users // Setea los usuarios que llegaron en la peticion
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                hasError: true,
                isFetching: false
            }
        default:
            return state
    }
}

function SelectOpponent() {

    const navigate = useNavigate()

    // Se usa el contexto de autenticacion para acceder al token con el que se solicitan los usuarios
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)

    // Hook reducer con el estado inicial: 
    // Deja disponible el dispatch para avisar al reducer si se disparo una accion
    // Deja disponible el estado para usarlo en el componente para mostrar los usuarios
    const [state, dispatch] = useReducer(reducer, initialState)

    // Manejo de paginacion
    const [currentPage, setCurentPage] = useState(1)
    const itemsPerPage = 30

    function prevPage() {
        setCurentPage(currentPage - 1)
    }
    function nextPage() {
        setCurentPage(currentPage + 1)
    }

    // Cuando se carga el componente obtiene los usuarios y los muestra (o al menos la 1er pagina)
    useEffect(() => {
        // Si tiene token se hace la peticion de usuarios
        if (authState.token) {
            authDispatch({
                type: SHOW_LOADER
            })

            dispatch({
                type: FETCH_USERS_REQUEST
            })

            // Peticion de la lista de usuarios
            fetch(apiUrl(`users?page=${currentPage}&itemsPerPage=${itemsPerPage}`), {
                headers: {
                    'Authorization': authState.token,   // Importante pasar el token
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw response
                }
            }).then(data => {
                dispatch({
                    // Si se ejecuto todo OK, se hace un dispatch de tipo succes con los usuarios que llegaron
                    type: FETCH_USERS_SUCCESS,
                    payload: data   // Este data tiene los usuarios
                })
            }).catch(error => {
                console.error('Error fetching the users', error)

                // Si da error 401, quiere decir que el token por algun motivo estaba mal
                if (error.status === 401) {
                    // Funcion utilitaria que refresca el token
                    refreshToken(
                        authState.refreshToken,
                        authDispatch,
                        navigate
                    )
                } else if (error.status === 403) {
                    navigate('/forbidden')
                } else {
                    dispatch({
                        type: FETCH_USERS_FAILURE
                    })
                }
            }).finally(() => {
                authDispatch({
                    type: HIDE_LOADER
                })
            })
        }
    }, [authDispatch, authState.token, authState.refreshToken, navigate, currentPage])

    return (
        // Todos los elementos que se renderizan aqui tienen acceso al contexto de usuarios,
        // puntualmente al state y al dispatch.
        <UsersContext.Provider value={{ state, dispatch }}>
            <main className='select-opponent'>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <PageTitle title="Select your opponent" subtitle="Begin a new game" />
                            <div className='separator'></div>
                            {!state.hasError && (
                                <div className='count-info'>
                                    <PersonFill />
                                    <p>Available in this page:</p>
                                    <h6>{state.users.length}</h6>
                                </div>
                            )}
                        </div>

                        <div className="col-12">
                            <div className='row users-container mt-5 overflow-hidden'>
                                {state.isFetching ? (
                                    <Loader />
                                ) : state.hasError ? (
                                    <FetchError />
                                ) : (
                                    <>
                                        {/* Si hay usuarios, mapea el array y genera un componente por cada uno */}
                                        {state.users.length > 0 ? (
                                            state.users.map(user => (
                                                // Key se utiliza para facilitar el renderizado
                                                <UserCard key={user.id} user={user} />
                                            ))
                                        ) : (
                                            <div><NoOpponents /></div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        <div className='col-12'>
                            <div className='pagination'>
                                {currentPage > 1 && (
                                    <button className='primary-button' onClick={() => prevPage()}><ChevronLeft /> Prev</button>
                                )}
                                {currentPage < state.users.length && (
                                    <button className='primary-button' onClick={() => nextPage()}>Next <ChevronRight /></button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </UsersContext.Provider>
    )
}

export default SelectOpponent