import { Link } from 'react-router-dom'
import { Person } from 'react-bootstrap-icons'

import singlePlayerImg from '../../assets/img/single-player.png'
import PageTitle from '../../components/PageTitle'
import FadeIn from '../../components/FadeIn'
import './style.scss'

const SinglePlayerStartScreen = () => {

    return (
        <FadeIn>
            <main className='single-player-start-screen'>
                <div className="container">
                    <div className="row mb-5">
                        <div className="col">
                            <PageTitle title="Practice the game" subtitle="Single player" />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-5 img-col">
                            <img src={singlePlayerImg} alt='Single player' />
                        </div>
                        <div className="col-md-7 text-col">
                            <p>
                                If you don't have an opponent to play with you, don't be upset. You can spend some time playing Rock Paper Scissors with a super AI. <br />
                                <br />
                                Just press the <strong>Get started</strong> button and we will generate  random plays for you.
                            </p>
                            <Link to="/single-play" className="primary-button"><Person />Get started</Link>
                        </div>
                    </div>
                </div>
            </main>
        </FadeIn>
    )
}

export default SinglePlayerStartScreen