import { House } from 'react-bootstrap-icons'

import forbiddenImg from '../../../assets/img/403.png'
import FadeIn from '../../../components/FadeIn'
import './style.scss'

function Forbidden() {
    return (
        <FadeIn>
            <main className="forbidden">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-3 img-col">
                            <img src={forbiddenImg} alt='Forbidden page' />
                        </div>
                        <div className="col-md-6 text-col">
                            <h3>403!</h3>
                            <h2>This is a forbidden page</h2>
                            <p>
                                Sorry, friend. This page has restricted access.
                            </p>
                            <a className="primary-button" href="/"><House/>Home</a>
                        </div>
                    </div>
                </div>
            </main>
        </FadeIn>
    )
}

export default Forbidden