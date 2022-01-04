import { useContext } from "react"
import { Link } from "react-router-dom"
import { People } from 'react-bootstrap-icons'

import { AuthContext } from "../../App"
import PageTitle from "../../components/PageTitle"
import multiPlayerImg from '../../assets/img/multi-player.png'
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
                            If you want to play with your friend, just press “Get Started” and you will be redirected to the next page. You will see a players list, select an oponent and press "Start".
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