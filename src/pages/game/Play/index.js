import { useContext, useReducer } from "react"
import { useNavigate, useParams } from "react-router-dom"

import rockImg from '../../../assets/img/rock.png'
import paperImg from '../../../assets/img/paper.png'
import scissorsImg from '../../../assets/img/scissors.png'
import { AuthContext } from "../../../App"
import { apiUrl } from "../../../utils/api-url"
import { refreshToken } from "../../../utils/refresh-token"
import { EDIT_GAME_FAILURE, EDIT_GAME_REQUEST, EDIT_GAME_SUCCESS, FORM_INPUT_CHANGE } from './action-types'

import PageTitle from "../../../components/PageTitle"
import NavigationLink from "../../../components/NavigationLink"
import './style.scss'

const initialState = {
    choice: '',
    isSending: false,
    hasError: false
}

// Manejo del estado de la jugada
const reducer = (state, action) => {
    switch (action.type) {
        case FORM_INPUT_CHANGE:
            return {
                ...state,
                choice: Number(action.payload.value)
            }
        case EDIT_GAME_REQUEST:
            return {
                ...state,
                isSending: true,
                hasError: false
            }
        case EDIT_GAME_SUCCESS:
            return {
                ...state,
                isSending: false,
                choice: action.payload.choice
            }
        case EDIT_GAME_FAILURE:
            return {
                ...state,
                isSending: false,
                hasError: true
            }
        default:
            return state
    }
}

function Play() {
    const { id } = useParams()
    const [state, dispatch] = useReducer(reducer, initialState)
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    // Se invoca en el onChange de los inputs
    const handleInputChange = (event) => {
        // Emision de dispatch que toma los valores del evento del formulario
        dispatch({
            type: FORM_INPUT_CHANGE,
            payload: {
                input: event.target.name,
                value: event.target.value
            }
        })
    }

    // Envia los datos a la API
    const handleFormSubmit = () => {
        dispatch({
            type: EDIT_GAME_REQUEST
        })

        fetch(apiUrl(`games/play/${id}`), {
            method: 'POST',
            headers: {
                'Authorization': authState.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                choice: state.choice
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        }).then(data => {
            dispatch({
                type: EDIT_GAME_SUCCESS,
                payload: data
            })
            navigate(`/games/result/${id}`)
        }).catch(error => {
            console.error('Error trying to edit the game', error)

            if (error.status === 401) {
                refreshToken(
                    authState.refreshToken,
                    authDispatch,
                    navigate,
                    () => handleFormSubmit()
                )
            } else if (error.status === 403) {
                navigate('/forbidden')
            } else {
                dispatch({
                    type: EDIT_GAME_FAILURE
                })
            }
        })
    }

    return (
        <main className="play">
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <PageTitle title="Do your next move" subtitle="Continue the game" />
                    </div>
                    <div className='col-12'>

                        <div className="choices">
                            <label htmlFor="rock">
                                <img src={rockImg} alt="Rock" />
                                <input
                                    type="radio"
                                    value={1}
                                    onChange={handleInputChange}
                                    name="choice"
                                    id="rock"
                                />
                            </label>
                            <label htmlFor="paper">
                                <img src={paperImg} alt="Paper" />
                                <input
                                    type="radio"
                                    value={2}
                                    onChange={handleInputChange}
                                    name="choice"
                                    id="paper"
                                />
                            </label>
                            <label htmlFor="scissors">
                                <img src={scissorsImg} alt="Scissors" />
                                <input
                                    type="radio"
                                    value={3}
                                    onChange={handleInputChange}
                                    name="choice"
                                    id="scissors"
                                />
                            </label>
                        </div>

                        <h6 className="message-card">{state.choice === 1 ? ("Rock") : state.choice === 2 ? ("Paper") : state.choice === 3 ? ("Scissors") : ("Nothing")} selected</h6>

                        <div className="buttons-group">
                            <NavigationLink to="/games/on-play" className="primary-button--faded">Cancel</NavigationLink>
                            {state.choice && (
                                <button onClick={handleFormSubmit} disabled={state.isSubmitting} className="primary-button">
                                    {state.isSubmitting ? ("Please wait...") : ("Play!")}
                                </button>
                            )}
                        </div>

                        {state.errorMessage && (<span className="form-error">{state.errorMessage}</span>)}

                    </div>
                </div>
            </div>
        </main>
    )
}

export default Play