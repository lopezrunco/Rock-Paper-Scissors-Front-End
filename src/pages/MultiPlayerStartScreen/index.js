import { useContext } from "react"
import { Link } from "react-router-dom"
import { People } from 'react-bootstrap-icons'

import PageTitle from "../../components/PageTitle"
import { AuthContext } from "../../App"

function MultiPlayerStartScreen() {
    const { state } = useContext(AuthContext)

    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <PageTitle title="Play against a friend" subtitle="Multiplayer" />
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