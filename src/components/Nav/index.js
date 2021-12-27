import { House, PeopleFill, Person } from 'react-bootstrap-icons'
import NavigationLink from '../NavigationLink'


import './style.scss'

function Nav() {

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
                                    <NavigationLink to="/multi-player-start-screen"><PeopleFill /><span>Multiplayer</span></NavigationLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Nav