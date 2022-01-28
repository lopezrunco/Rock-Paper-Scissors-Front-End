import FadeIn from '../FadeIn'
import './style.scss'

function NoGameItems() {
    return (
        <FadeIn>
            <div className='col-12'>
                <div className='message-card no-game-items'>
                    <h4>There's nothing here!</h4>
                    <p>To start a new game, press "New game"</p>
                </div>
            </div>
        </FadeIn>
    )
}

export default NoGameItems