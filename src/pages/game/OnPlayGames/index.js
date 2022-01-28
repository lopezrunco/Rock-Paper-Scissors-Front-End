import { createContext, useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react/cjs/react.development'
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons'

import { refreshToken } from '../../../utils/refresh-token'
import { apiUrl } from '../../../utils/api-url'
import { AuthContext } from '../../../App'
import { HIDE_LOADER, SHOW_LOADER } from '../../../action-types'
import { FETCH_ONPLAY_GAMES_FAILURE, FETCH_ONPLAY_GAMES_REQUEST, FETCH_ONPLAY_GAMES_SUCCESS } from './action-types'

import OnPlayGame from './components/OnPlayGame'
import PageTitle from '../../../components/PageTitle'
import NoGameItems from '../../../components/NoGameItems'
import Loader from '../../../components/Loader'
import FetchError from '../../../components/FetchError'
import FadeIn from '../../../components/FadeIn'

// Creacion de contexto para los onplay games
export const OnPlayGamesContext = createContext()

// Estado inicial del componente
const initialState = {
    games: [],
    isFetching: false,
    hasError: false
}

// Reducer para manejo de estado de los onplay games
const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_ONPLAY_GAMES_REQUEST:
            return {
                ...state,
                isFetching: true,
                hasError: false
            }
        case FETCH_ONPLAY_GAMES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                games: action.payload.games // Setea los datos que llegaron en la peticion
            }
        case FETCH_ONPLAY_GAMES_FAILURE:
            return {
                ...state,
                hasError: true,
                isFetching: false
            }
        default:
            return state
    }
}

function OnPlayGames() {
    const navigate = useNavigate()
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    const [state, dispatch] = useReducer(reducer, initialState)

    // Manejo de paginacion
    const [currentPage, setCurentPage] = useState(1)
    const itemsPerPage = 9

    function prevPage() {
        setCurentPage(currentPage - 1)
    }
    function nextPage() {
        setCurentPage(currentPage + 1)
    }

    // Cuando se carga el componente obtiene los juegos y los muestra
    useEffect(() => {
        // Si tiene token se hace la peticion
        if (authState.token) {
            authDispatch({
                type: SHOW_LOADER
            })

            dispatch({
                type: FETCH_ONPLAY_GAMES_REQUEST
            })

            // Peticion de los onplay games
            fetch(apiUrl(`games/on-play?page=${currentPage}&itemsPerPage=${itemsPerPage}`), {
                headers: {
                    'Authorization': authState.token,
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
                    // Si salio todo ok, emite dispatch SUCCES con los onplay games
                    type: FETCH_ONPLAY_GAMES_SUCCESS,
                    payload: data
                })
            }).catch(error => {
                console.error('Error trying to fetch onplay games', error)

                if (error.status === 401) {
                    refreshToken(
                        authState.refreshToken,
                        authDispatch,
                        navigate
                    )
                } else if (error.status === 403) {
                    navigate('/forbidden')
                } else {
                    dispatch({
                        type: FETCH_ONPLAY_GAMES_FAILURE
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
        <OnPlayGamesContext.Provider value={{ state, dispatch }}>
            <main>
                <div className='container'>
                    <div className="row">
                        <div className="col-12">
                            <FadeIn>
                                <PageTitle title="On play games" subtitle="Continue the fun" />
                            </FadeIn>
                        </div>

                        <div className="col-12">
                            <div className='row on-play-games-container mt-5'>
                                {state.isFetching ? (
                                    <Loader />
                                ) : state.hasError ? (
                                    <FadeIn>
                                        <FetchError />
                                    </FadeIn>
                                ) : (
                                    <>
                                        {/* Si hay onplay games, genera un componente por cada uno */}
                                        {state.games.length > 0 ? (
                                            state.games.map(game => (
                                                <OnPlayGame key={game.id} game={game} />
                                            ))
                                        ) : (
                                            <NoGameItems />
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        <div className='col-12'>
                            <FadeIn>
                                <div className='pagination'>
                                    {currentPage > 1 && (
                                        <button className='primary-button' onClick={() => prevPage()}><ChevronLeft /> Prev</button>
                                    )}
                                    {currentPage < state.games.length && (
                                        <button className='primary-button' onClick={() => nextPage()}>Next <ChevronRight /></button>
                                    )}
                                </div>
                            </FadeIn>
                        </div>

                    </div>
                </div>
            </main>
        </OnPlayGamesContext.Provider>
    )
}

export default OnPlayGames