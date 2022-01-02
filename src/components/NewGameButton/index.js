import { Plus } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

function NewGameButton() {
    return (
        <Link to={'/select-opponent'} className='new-game-button'><Plus /> New game</Link>
    )
}

export default NewGameButton