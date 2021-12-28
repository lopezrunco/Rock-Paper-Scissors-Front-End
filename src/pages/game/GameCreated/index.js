import { Link } from "react-router-dom"
import PageTitle from "../../../components/PageTitle"
import { Joystick } from 'react-bootstrap-icons'

function GameCreated() {
    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <PageTitle title="The game has been created!" subtitle="Done!" />
                        <p>
                            Now your oponent will recibe the game notification and will do the first move. <br />
                            You can check it on the OnPlay Games page.
                        </p>
                        <Link to="/on-play" className="primary-button"><Joystick />On play games</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default GameCreated