import { createContext, useContext, useEffect, useReducer } from "react"
import { useNavigate } from "react-router-dom"
import { HIDE_LOADER, SHOW_LOADER } from "../../../action-types"

import { AuthContext } from '../../../App'
import NoGameItems from "../../../components/NoGameItems"
import PageTitle from "../../../components/PageTitle"
import { apiUrl } from "../../../utils/api-url"
import { refreshToken } from "../../../utils/refresh-token"
import { FETCH_HISTORY_GAMES_FAILURE, FETCH_HISTORY_GAMES_REQUEST, FETCH_HISTORY_GAMES_SUCCESS } from './action-types'
import FinishedGame from "./components/FinishedGame"

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

    useEffect(() => {
        if (authState.token) {
            authDispatch({
                type: SHOW_LOADER
            })
            dispatch({
                type: FETCH_HISTORY_GAMES_REQUEST
            })

            fetch(apiUrl('games/history'), {
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
    }, [authDispatch, authState.token, authState.refreshToken, navigate])

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
                                    <p>Loading...</p>
                                ) : state.hasError ? (
                                    <span>An error ocurred</span>
                                ) : (
                                    <>
                                        {/* Si hay juegos, genera un componente por cada uno */}
                                        {state.historyGames.length > 0 ? (
                                            state.historyGames.map(game => (
                                                <FinishedGame key={game.id} game={game} />
                                            ))
                                        ) : (
                                            <div>
                                                <NoGameItems />
                                            </div>
                                        )}
                                    </>
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
