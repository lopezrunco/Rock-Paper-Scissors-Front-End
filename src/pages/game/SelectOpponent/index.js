import { createContext, useContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'

import PageTitle from '../../../components/PageTitle'
import UserCard from './components/UserCard'

import { refreshToken } from '../../../utils/refresh-token'
import { apiUrl } from '../../../utils/api-url'
import { AuthContext } from '../../../App'
import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from './action-types'
import { HIDE_LOADER, SHOW_LOADER } from '../../../action-types'

import './style.scss'

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
            fetch(apiUrl('users'), {
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
    }, [authDispatch, authState.token, authState.refreshToken, navigate])

    return (
        // Todos los elementos que se renderizan aqui tienen acceso al contexto de usuarios,
        // puntualmente al state y al dispatch.
        <UsersContext.Provider value={{ state, dispatch }}>
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <PageTitle title="Select your opponent" subtitle="Begin a new game" />
                        </div>

                        <div className="col-12">
                            <div className='row users-container mt-5'>
                                {state.isFetching ? (
                                    <p>Loading...</p>
                                ) : state.hasError ? (
                                    <span>An error ocurred</span>
                                ) : (
                                    <>
                                        {/* Si hay usuarios, mapea el array y genera un componente por cada uno */}
                                        {state.users.length > 0 ? (
                                            state.users.map(user => (
                                                // Key se utiliza para facilitar el renderizado
                                                <UserCard key={user.id} user={user} />
                                            ))
                                        ) : (
                                            <div>
                                                <p>No opponents yet!</p>
                                            </div>
                                        )}
                                    </>
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