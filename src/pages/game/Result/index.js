import { useContext, useEffect, useReducer } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Joystick } from 'react-bootstrap-icons'

import { AuthContext } from '../../../App'
import PageTitle from "../../../components/PageTitle"
import { apiUrl } from "../../../utils/api-url"
import { refreshToken } from "../../../utils/refresh-token"
import { HIDE_LOADER, SHOW_LOADER } from "../../../action-types"
import { FETCH_GAME_RESULT_FAILURE, FETCH_GAME_RESULT_REQUEST, FETCH_GAME_RESULT_SUCCESS } from './action-types'

import './style.scss'

const initialState = {
    gameResult: '',
    isFetching: false,
    hasError: false
}

// Manejo del estado del juego actual
const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_GAME_RESULT_REQUEST:
            return {
                ...state,
                isFetching: true,
                hasError: false
            }
        case FETCH_GAME_RESULT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                gameResult: action.payload.game
            }
        case FETCH_GAME_RESULT_FAILURE:
            return {
                ...state,
                hasError: true,
                isFetching: false
            }
        default:
            return state
    }
}

function Result() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (authState.token) {
            authDispatch({
                type: SHOW_LOADER
            })
            dispatch({
                type: FETCH_GAME_RESULT_REQUEST
            })

            fetch(apiUrl(`games/result/${id}`), {
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
                    type: FETCH_GAME_RESULT_SUCCESS,
                    payload: data
                })
            }).catch(error => {
                console.error('Error trying to fetch the game result', error)

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
                        type: FETCH_GAME_RESULT_FAILURE
                    })
                }
            }).finally(() => {
                authDispatch({
                    type: HIDE_LOADER
                })
            })
        }
    }, [authDispatch, authState.token, authState.refreshToken, navigate, id])

    return (
        <main className="game-result">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <PageTitle title="Game results:" subtitle="Played!" />
                    </div>

                    <div className="col-12">
                        <div className="game-card--played">
                            <div className="row">
                                <div className="col-md-6 player-result">
                                    <h6>{state.gameResult.playerOneNickname}</h6>
                                    <p>{state.gameResult.playerOneMoves}</p>
                                </div>
                                <div className="col-md-6 player-result">
                                    <h6>{state.gameResult.playerTwoNickname}</h6>
                                    <p>{state.gameResult.playerTwoMoves}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="buttons-group">
                        <span className="message-card">Game {state.gameResult.completed === true ? ("completed") : ("not completed")}</span>
                        <Link className="primary-button" to={'/games/on-play'}><Joystick />Onplay games</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Result