import { useContext } from 'react'
import { People, Person } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../App'
import rpsLogo from '../../assets/img/rps-logo.png'
import './style.scss'

function WelcomeScreen() {
    const { state } = useContext(AuthContext)

    return (
        <main className='welcome-screen'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className='intro'>
                            <img src={rpsLogo} alt='RPS game app' />
                            <h1>ROCK PAPER SCISSORS</h1>
                            <div>
                                <p>
                                    Many of us used to play it in a school to resolve disputes or
                                    just to spend some time. <br /> But how to play if your friends are far
                                    away? Voilà!
                                </p>
                                <div className='separator'></div>
                                <h4>What are the rules?</h4>
                                <p>
                                    If you choose Rock, you will win against Scissors but lose against Paper.<br />
                                    If you choose Scissors, you will win against Paper but lose against Rock.<br />
                                    If you choose Paper, you will win against Rock but lose against Scissors.<br />
                                    There are 3 rounds. The game ends when somebody gets 2 wins.
                                </p>

                                {
                                    !state.user && (<Link to="/login" className="primary-button"><Person />Login</Link>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default WelcomeScreen