import { Link } from 'react-router-dom'
import PageTitle from '../../components/PageTitle'

const SinglePlayerStartScreen = () => {

    return (

        <main>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <PageTitle title="Practice the game" subtitle="Single player" />
                        <p>
                            If you don’t have an opponent to play with you, don’t be upset. You can spend some time playing Rock Paper Scissors with a AI. Please click a “Get started” button and the game will play with you.
                        </p>
                        <Link to="/single-play" className="primary-button">Get started</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SinglePlayerStartScreen