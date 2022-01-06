import { useContext, useReducer } from 'react'

import { AuthContext } from '../../../App'
import { ENABLE_MFA_FAILURE, ENABLE_MFA_REQUEST, ENABLE_MFA_SUCCESS } from './action-types'

import PageTitle from "../../../components/PageTitle"
import './style.scss'
import { useNavigate } from 'react-router-dom'
import { ENABLE_MFA, HIDE_LOADER, SHOW_LOADER } from '../../../action-types'
import { apiUrl } from '../../../utils/api-url'
import { refreshToken } from '../../../utils/refresh-token'

const initialState = {
    mfa: undefined,
    isSending: false,
    hasError: false
}

// Reducer para manejo de habilitacion de MFA
const reducer = (state, action) => {
    switch (action.type) {
        case ENABLE_MFA_REQUEST:
            return {
                ...state,
                isSending: true,
                hasError: false
            }
        case ENABLE_MFA_SUCCESS:
            return {
                ...state,
                isSending: false,
                mfa: action.payload
            }
        case ENABLE_MFA_FAILURE:
            return {
                ...state,
                isSending: false,
                hasError: true
            }
        default:
            return state
    }
}

function DashBoard() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleEnableMfa = () => {
        dispatch({
            type: SHOW_LOADER
        })

        dispatch({
            type: ENABLE_MFA_REQUEST
        })

        fetch(apiUrl('auth/mfa'), {
            method: 'GET',
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
                type: ENABLE_MFA_SUCCESS,
                payload: data
            })

            dispatch({
                type: ENABLE_MFA
            })
        }).catch(error => {
            console.error('Error trying to enable MFA', error)

            if (error.status === 401) {
                refreshToken(
                    authState.refreshToken,
                    authDispatch,
                    navigate,
                    () => handleEnableMfa()
                )
            } else if (error.status === 403) {
                navigate('/forbidden')
            } else {
                dispatch({
                    type: ENABLE_MFA_FAILURE
                })
            }
        }).finally(() => {
            authDispatch({
                type: HIDE_LOADER
            })
        })
    }

    return (
        <main className="dashboard">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <PageTitle title={authState.user.nickname} subtitle="Your profile" />
                        <div className='separator'></div>
                        <p>Here you can check your user info, view your activity and your progress in the game.</p>
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col-12'>
                        <div className='info-card user'>
                            <h6>User info</h6>
                            <div className='separator'></div>
                            <p>Nickname: {authState.user.nickname}</p>
                            <p>User ID: {authState.user.id}</p>
                            <p>Email: {authState.user.email}</p>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='info-card preferences'>

                            <h6>Preferences</h6>
                            <div className='separator'></div>
                            <div className=' enable-mfa-info'>
                                <p>
                                    Multi-Factor Authentication (MFA) increases security of your account.<br />
                                    To use this feature, click on button below.
                                </p>

                                {authState.user.mfaEnabled ? (
                                    <button className='primary-button--freezed'>Enabled</button>
                                ) : (
                                    <button onClick={handleEnableMfa} disabled={authState.user.mfaEnabled} className='primary-button'>Enable MFA</button>
                                )}
                            </div>

                            <div className='enable-mfa-container'>
                                {/* Se muestra solo si el MFA tiene valor */}
                                {
                                    state.mfa &&
                                    <div className='qr-container'>
                                        <img className='qr-img' src={state.mfa.qr} />
                                        <small className='instructions'>
                                            Scan the image above into a MFA app (e.g. Google Authenticator) <br />
                                            Next time you login, we will ask for an acces token generated with the app.
                                        </small>
                                        <small>Secret key: <span className='secret-key'>{state.mfa.secret}</span></small>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </main>
    )
}

export default DashBoard