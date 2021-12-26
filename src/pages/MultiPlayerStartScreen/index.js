import { Link } from "react-router-dom"
import PageTitle from "../../components/PageTitle"

function MultiPlayerStartScreen() {
    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <PageTitle title="Play against a friend" subtitle="Multiplayer" />
                        <p>
                            If you want to play with your friend, just press “Get Started” and you will be redirected to the next page. You will see a players list, select an oponent and press "Start". The game will begin when the other player will do the first move.
                        </p>
                        <Link to="/login" className="primary-button">Get started</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MultiPlayerStartScreen