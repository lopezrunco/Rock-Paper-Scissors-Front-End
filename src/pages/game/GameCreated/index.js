import { Link } from "react-router-dom"
import { Joystick } from 'react-bootstrap-icons'

import PageTitle from "../../../components/PageTitle"
import gameCreatedPlayerImg from '../../../assets/img/game-created.png'
import './style.scss'

function GameCreated() {
    return (
        <main className='game-created'>
            <div className="container">
                <div className="row mb-5">
                    <div className="col">
                        <PageTitle title="The game has been created!" subtitle="Done!" />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-5 img-col">
                        <img src={gameCreatedPlayerImg} alt='Single player' />
                    </div>
                    <div className="col-md-7 text-col">
                        <p>
                            You can start the game on the OnPlay games page. <br />
                            Once you do your first move, you must wait to the other player to do the next move.
                        </p>
                        <Link to="/games/on-play" className="primary-button"><Joystick />On play games</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default GameCreated