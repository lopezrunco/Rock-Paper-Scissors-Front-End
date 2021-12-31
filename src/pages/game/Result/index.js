import { useContext, useEffect, useReducer } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { HIDE_LOADER, SHOW_LOADER } from "../../../action-types"
import { AuthContext } from '../../../App'
import PageTitle from "../../../components/PageTitle"
import { apiUrl } from "../../../utils/api-url"
import { refreshToken } from "../../../utils/refresh-token"

import { FETCH_GAME_RESULT_FAILURE, FETCH_GAME_RESULT_REQUEST, FETCH_GAME_RESULT_SUCCESS } from './action-types'

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
                        <p>Game {state.gameResult.completed === true ? ("completed") : ("not completed")}</p>
                    </div>

                    <div className="col-md-6">
                        <p>Player 1: {state.gameResult.playerOneNickname}</p>
                        <p>player 1 moves: {state.gameResult.playerOneMoves}</p>
                    </div>

                    <div className="col-md-6">
                        <p>Player 2: {state.gameResult.playerTwoNickname}</p>
                        <p>player 2 moves: {state.gameResult.playerTwoMoves}</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Result