import { Person } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

import FadeIn from '../FadeIn'
import './style.scss'

function NoOpponents() {
    return (
        <FadeIn>
            <div className='col-12'>
                <div className='message-card no-opponents'>
                    <h4>There's no opponents!</h4>
                    <p>In the meantime, you can practice the game on the Single Player page</p>
                    <Link to='/single-play' className='primary-button'><Person />Single player</Link>
                </div>
            </div>
        </FadeIn>
    )
}

export default NoOpponents