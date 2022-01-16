import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons'

import { apiUrl } from "../../../utils/api-url"
import { refreshToken } from "../../../utils/refresh-token"
import { HIDE_LOADER, SHOW_LOADER } from "../../../action-types"
import { FETCH_HISTORY_GAMES_FAILURE, FETCH_HISTORY_GAMES_REQUEST, FETCH_HISTORY_GAMES_SUCCESS } from './action-types'

import FinishedGame from "./components/FinishedGame"
import NoGameItems from "../../../components/NoGameItems"
import PageTitle from "../../../components/PageTitle"
import { AuthContext } from '../../../App'
import Loader from "../../../components/Loader"
import FetchError from "../../../components/FetchError"

// Creacion de contexto para el historico de juegos
export const HistoryGamesContext = createContext()

// Estado inicial del componente
const initialState = {
    historyGames: [],
    isFetching: false,
    hasError: false
}

// Reducer para manejo de estado del historico de juegos
const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_HISTORY_GAMES_REQUEST:
            return {
                ...state,
                isFetching: true,
                hasError: false
            }
        case FETCH_HISTORY_GAMES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                historyGames: action.payload.games
            }
        case FETCH_HISTORY_GAMES_FAILURE:
            return {
                ...state,
                hasError: true,
                isFetching: false
            }
        default:
            return state
    }
}

function History() {
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

    useEffect(() => {
        if (authState.token) {
            authDispatch({
                type: SHOW_LOADER
            })
            dispatch({
                type: FETCH_HISTORY_GAMES_REQUEST
            })

            fetch(apiUrl(`games/history?page=${currentPage}&itemsPerPage=${itemsPerPage}`), {
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
                    type: FETCH_HISTORY_GAMES_SUCCESS,
                    payload: data
                })
            }).catch(error => {
                console.error('Error trying to fetch games history', error)

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
                        type: FETCH_HISTORY_GAMES_FAILURE
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
        <HistoryGamesContext.Provider value={{ state, dispatch }}>
            <main className="history-games">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <PageTitle title="Games history" subtitle="Finished games" />
                        </div>

                        <div className="col-12">
                            <div className="row games-history-container mt-5">
                                {state.isFetching ? (
                                    <Loader />
                                ) : state.hasError ? (
                                    <FetchError />
                                ) : (
                                    <>
                                        {/* Si hay juegos, genera un componente por cada uno */}
                                        {state.historyGames.length > 0 ? (
                                            state.historyGames.map(game => (
                                                <FinishedGame key={game.id} game={game} />
                                            ))
                                        ) : (
                                            <div><NoGameItems /></div>
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
                                {currentPage < state.historyGames.length && (
                                    <button className='primary-button' onClick={() => nextPage()}>Next <ChevronRight /></button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </HistoryGamesContext.Provider>
    )
}

export default History
