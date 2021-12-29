import { Link } from 'react-router-dom'
import './style.scss'

function OnPlayGame({ game }) {

    // Generacion dinamica del historico de movimientos
    const movesPlayerOne = []
    const movesPlayerTwo = []
    game.playerOneMoves.forEach(element => {
        movesPlayerOne.push(<h5>{element}</h5>)
    })
    game.playerTwoMoves.forEach(element => {
        movesPlayerTwo.push(<h5>{element}</h5>)
    })

    return (
        <div className="col-md-4 mb-4">
            <div className='game-card--onplay'>
                <h6>Game id: {game.id}</h6>
                <p>Player 1: {game.playerOneId}</p>
                <p>Player 2: {game.playerTwoId}</p>
                <hr />
                <div className="row">
                    <div className="col-6"><h6>Moves player 1:</h6>{movesPlayerOne}</div>
                    <div className="col-6"><h6>Moves player 2:</h6>{movesPlayerTwo}</div>
                </div>
                <hr />
                <Link to='/games/on-play/:id'>Continue</Link>
            </div>
        </div>
    )
}

export default OnPlayGame