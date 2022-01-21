import { useContext } from 'react/cjs/react.development'
import { PersonFill, TrophyFill, People, Person } from 'react-bootstrap-icons'

import { AuthContext } from '../../App'
import PageTitle from '../../components/PageTitle'
import questionImg from '../../assets/img/question.png'
import rpsLogo from '../../assets/img/rps-logo.png'
import rockImg from '../../assets/img/rock.png'
import paperImg from '../../assets/img/paper.png'
import scissorsImg from '../../assets/img/scissors.png'

import './style.scss'
import { Link } from 'react-router-dom'

function TutorialScreen() {
    const { state: authState } = useContext(AuthContext)

    return (
        <main className='tutorial-screen'>
            <div className="container">
                <div className="row mb-5">
                    <div className="col">
                        <PageTitle title="Instructions for the game" subtitle="Welcome!" />
                    </div>
                </div>

                {/* Opponents info */}
                <div className="row section">
                    <div className='col-xl-4 image'>
                        <div>
                            <button className="user-card">
                                <PersonFill />
                                <h4>MachineGuy</h4>
                            </button>
                            <button className="user-card">
                                <PersonFill />
                                <h4>PostalDude62</h4>
                            </button>
                        </div>
                    </div>
                    <div className='col-xl-8 text'>
                        <h5>Select an opponent and create a game</h5>
                        <p>
                            In the <Link to='/select-opponent'>Select opponent</Link> page, a list will be displayed with all the users logged
                            in the system and you will be able to select the opponents for the game among them.
                            Note that if you already have a game in progress with some users,
                            they will not be displayed in the list. <br />
                            Once you select the opponent, the game will be created.
                        </p>
                    </div>
                    <div className='col-12'>
                        <div className='separator'></div>
                    </div>
                </div>

                {/* Onplay games inicio */}
                <div className="row section">
                    <div className='col-xl-8 text'>
                        <h5>OnPlay games</h5>
                        <p>
                            Congratulations! You have created your first game. <br />
                            All games in progress, whether started by you or not, are in the <Link to='/games/on-play'>OnPlay</Link> page.
                            If you started the game, you will be the player 1 and the opponent you selected
                            will be the player 2. When another user starts a game and selects you as an opponent,
                            in this case you will be the player 2. <br />
                            To start playing, you must press <strong>Continue</strong>.
                        </p>
                    </div>
                    <div className='col-xl-4 image'>
                        <div className='row'>
                            <div className="onplay-game-wrapper">
                                <div className='game-card--onplay'>
                                    <div className="row">
                                        <div className="col-6 moves-col">
                                            <h5 className='mb-4'>{authState.user.nickname}</h5>
                                        </div>
                                        <div className="col-6 moves-col">
                                            <h5 className='mb-4'>MachineGuy</h5>
                                        </div>
                                    </div>
                                </div>
                                <span className='primary-button'>Continue</span>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='separator'></div>
                    </div>
                </div>

                {/* Como jugar */}
                <div className="row section">
                    <div className='col-xl-3 image'>
                        <img src={rpsLogo} alt='Rock Papper Scissors' />
                    </div>
                    <div className='col-xl-9 text'>
                        <h5>Play!</h5>
                        <p>
                            To make your move, you simply have to touch the element you want to play
                            (Rock, paper or scissors). <br />
                            Once done, you must confirm the move by pressing <strong>Play!</strong>
                        </p>
                    </div>
                    <div className='col-12'>
                        <div className='separator'></div>
                    </div>
                </div>

                {/* Onplay games dinamica */}
                <div className="row section">
                    <div className='col-xl-10 text'>
                        <h5>Game dynamics</h5>
                        <p>

                            As the players make their moves, they accumulate on the game card. When the moves are at the same level (for example, you have made two moves and you also oppose), they will be shown by the rock, paper, scissors icons. <br />
                            When you have made a move but your opponent has not yet, it is displayed as a question icon, and is not revealed until your opponent makes their move. <br />
                            Finally, when both have made three moves, you must go to the <Link to='/games/history'>History</Link> page to see the winner.
                        </p>
                    </div>
                    <div className='col-xl-2 image'>
                        <img src={questionImg} alt='Question' />
                    </div>
                    <div className='col-12'>
                        <div className='separator'></div>
                    </div>
                </div>

                {/* Games history */}
                <div className="row section">
                    <div className='col-xl-4 image'>
                        <div className='row finished-game game-card--played'>

                            <div className='col-6'>
                                <h5>{authState.user.nickname}</h5>
                            </div>
                            <div className='col-6'>
                                <div className='grid'>
                                    <img className='move-img' src={rockImg} alt='Rock' />
                                    <img className='move-img' src={scissorsImg} alt='Rock' />
                                    <img className='move-img' src={paperImg} alt='Rock' />
                                </div>
                            </div>
                            <hr />
                            <div className='col-6'>
                                <h5>MachineGuy</h5>
                            </div>
                            <div className='col-6'>
                                <div className='grid'>
                                    <img className='move-img' src={rockImg} alt='Rock' />
                                    <img className='move-img' src={rockImg} alt='Rock' />
                                    <img className='move-img' src={scissorsImg} alt='Rock' />
                                </div>
                            </div>

                        </div>
                        <span className='winner-card'><TrophyFill />{authState.user.nickname}</span>
                    </div>
                    <div className='col-xl-8 text'>
                        <h5>Games history</h5>
                        <p>
                            In <Link to='/games/history'>this page</Link> you can see the result of the plays indicating the nickname of the winner player or if it was a draw. <br />
                            You can also see the moves made at each stage of the game.
                        </p>
                    </div>
                    <div className='col-12'>
                        <div className='separator'></div>
                    </div>
                </div>

                <div className="row section text-center">
                    <div className='col-12'>
                        <p>
                            Now you know how to play, it's time to have fun! <br />
                            In case there is no opponent to select, you always can practice in the <Link to='/single-play'>Singleplayer</Link> page.
                        </p>
                        <a className="primary-button" href="/single-play"><Person />Singleplayer</a>
                        <a className="primary-button" href="/select-opponent"><People />Multiplayer</a>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default TutorialScreen