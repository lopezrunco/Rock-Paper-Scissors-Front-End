import { useContext } from "react"
import { Link } from "react-router-dom"
import { People } from 'react-bootstrap-icons'

import { AuthContext } from "../../App"
import multiPlayerImg from '../../assets/img/multi-player.png'
import PageTitle from "../../components/PageTitle"
import './style.scss'

function MultiPlayerStartScreen() {
    const { state } = useContext(AuthContext)

    return (
        <main className='multi-player-start-screen'>
            <div className="container">
                <div className="row mb-5">
                    <div className="col">
                        <PageTitle title="Play against a friend" subtitle="Multiplayer" />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-5 img-col">
                        <img src={multiPlayerImg} alt='Single player' />
                    </div>
                    <div className="col-md-7 text-col">
                        <p>
                            If you want to play with a friend or a mortal enemy, press <strong>Get Started</strong>. You will see a list to select your opponent. <br/>
                            Note that in case you haven't finished a game with an opponent, you can't start a new one with him.
                        </p>
                        {
                            state.user ? (
                                <Link to="/select-opponent" className="primary-button"><People />Select opponent</Link>
                            ) : (
                                <Link to="/login" className="primary-button"><People />Get started</Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MultiPlayerStartScreen