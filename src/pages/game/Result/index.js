import { useContext, useEffect, useReducer } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Joystick, ClockHistory } from 'react-bootstrap-icons'

import { AuthContext } from '../../../App'
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

    let playerOne = state.gameResult.playerOneNickname
    let playerTwo = state.gameResult.playerTwoNickname

    return (
        <main className="game-result">
            <div className="container">
                <div className="row">

                    <div className="col-md-8">
                        <div className="game-card--played">
                            <h3>Played!</h3>
                            <div className="separator"></div>
                            <h5>{state.gameResult.completed === false ? 
                            (`Now you must wait to ${authState.user.id === state.gameResult.playerTwoId ? playerOne : playerTwo} do the next move`) : 
                            (`The game is completed! Go to the history page to check the winner`)}</h5>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="buttons-group">
                            <Link className="primary-button" to={'/games/on-play'}><Joystick />Onplay games</Link>
                            <Link className="primary-button" to={'/games/history'}><ClockHistory />Games history</Link>
                        </div>
                    </div>

                </div>
            </div>
        </main >
    )
}

export default Result