import { Person, House } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react/cjs/react.development'

import { AuthContext } from '../../../App'
import notFoundImg from '../../../assets/img/logged-out.png'
import FadeIn from '../../../components/FadeIn'
import './style.scss'

function LoggedOut() {

    const { state } = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <FadeIn>
            <main className="logged-out">

                {/* Solo se muestra si no hay usuario logueado, de lo contrario, lleva a home */}
                {!state.user ? (
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
                ) : (
                    navigate('/')
                )}
            </main>
        </FadeIn>
    )
}

export default LoggedOut