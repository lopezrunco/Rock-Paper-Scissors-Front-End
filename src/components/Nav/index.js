import { House, People, Person, Joystick, BoxArrowRight } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react/cjs/react.development'
import { LOGOUT } from '../../action-types'

import { AuthContext } from '../../App'
import NavigationLink from '../NavigationLink'


import './style.scss'

function Nav() {
    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const logout = () => {
        dispatch({ type: LOGOUT })
        navigate('/logged-out')
    }

    return (
        <header>
            <div className="container">
                <div className="row">
                    <div className="col header-container">
                        <nav>
                            <ul>
                                <li>
                                    <NavigationLink to="/"><House /><span>Home</span></NavigationLink>
                                </li>
                                <li>
                                    <NavigationLink to="/single-player-start-screen"><Person /><span>Singleplayer</span></NavigationLink>
                                </li>
                                <li>
                                    <NavigationLink to="/multi-player-start-screen"><People /><span>Multiplayer</span></NavigationLink>
                                </li>
                                <li>
                                    <NavigationLink to="/games/on-play"><Joystick /><span>OnPlay</span></NavigationLink>
                                </li>
                            </ul>
                        </nav>
                        <button className='logout-button' onClick={logout}><BoxArrowRight /></button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Nav