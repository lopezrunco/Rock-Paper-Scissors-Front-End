import { useContext, useReducer } from "react"
import { useNavigate } from "react-router-dom"
import { PersonFill } from 'react-bootstrap-icons'

import { AuthContext } from "../../../../../App"
import { apiUrl } from "../../../../../utils/api-url"
import { refreshToken } from "../../../../../utils/refresh-token"
import { CREATE_GAME_FAILURE, CREATE_GAME_REQUEST, CREATE_GAME_SUCCESS } from "../../action-types"

const initialState = {
    playerOneId: '',
    playerTwoId: '',
    isSending: false,
    hasError: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case CREATE_GAME_REQUEST:
            return {
                ...state,
                isSending: true,
                hasError: false
            }
        case CREATE_GAME_SUCCESS:
            return {
                ...state,
                isSending: false,
                game: action.payload.game
            }
        case CREATE_GAME_FAILURE:
            return {
                ...state,
                isSending: false,
                hasError: true
            }
        default:
            return state
    }
}

function UserCard({ user }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    // Envia los datos a la API
    const createGame = (userId) => {
        dispatch({
            type: CREATE_GAME_REQUEST
        })

        // Llamada al endpoint de crear juego
        fetch(apiUrl('/games/create'), {
            method: 'POST',
            headers: {
                'Authorization': authState.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playerOneId: authState.user.id,
                playerOneNickname: authState.user.nickname,
                playerTwoId: userId,
                playerTwoNickname: user.nickname
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        }).then(data => {
            dispatch({
                type: CREATE_GAME_SUCCESS,
                payload: data
            })
            navigate('/game-created')
        }).catch(error => {
            console.error('Error trying to create a new game', error)

            // Si da error 401, quiere decir que el token por algun motivo estaba mal
            if (error.status === 401) {
                refreshToken(
                    authState.refreshToken,
                    authDispatch,
                    navigate,
                    () => createGame()  // Si el refresh sale ok, reintenta hacer la peticion
                )
            } else if (error.status === 403) {
                navigate('/forbidden')
            } else {
                dispatch({
                    type: CREATE_GAME_FAILURE
                })
            }
        })
    }

    return (
        <div className="col-12 col-lg-6 col-xl-4">
                <button onClick={() => createGame(user.id)} disabled={state.isSending} className="user-card">
                    <PersonFill />
                    {state.isSending ? ("Please wait...") : <h4>{user.nickname}</h4>}
                </button>

                {state.hasError && (
                    <span className="form-error">An error has occurred!</span>
                )}

        </div>
    )
}

export default UserCard