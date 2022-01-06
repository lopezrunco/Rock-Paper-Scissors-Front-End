import { Person, House } from 'react-bootstrap-icons'

import notFoundImg from '../../../assets/img/logged-out.png'
import './style.scss'

function LoggedOut() {
    return (
        <main className="logged-out">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-3 img-col">
                        <img src={notFoundImg} alt='Logged out' />
                    </div>
                    <div className="col-md-6 text-col">
                        <h3>Bye!</h3>
                        <h2>You are now logged out</h2>
                        <p>
                            To play with your friends, you need to register or login if you already have an account.
                        </p>
                        <div>
                            <a className="primary-button" href="/login"><Person />Login</a>
                            <a className="primary-button--faded" href="/"><House />Home</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default LoggedOut