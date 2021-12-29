import { Link } from 'react-router-dom'
import './style.scss'

function OnPlayGame({ game }) {

    return (
        <div className="col-md-4 mb-4">
            <div className='game-card--onplay'>
                <h6>Game id: {game.id}</h6>
                <p>Player 1: {game.playerOneId}</p>
                <p>Player 2: {game.playerTwoId}</p>
                <hr />
                <div className="row">
                    <div className="col-6"><h6>Moves player 1:</h6></div>
                    <div className="col-6"><h6>Moves player 2:</h6></div>

                    <div className="col-6">{game.playerOneMoves[0]}</div>
                    <div className="col-6">{game.playerTwoMoves[0]}</div>

                    <div className="col-6">{game.playerOneMoves[1]}</div>
                    <div className="col-6">{game.playerTwoMoves[1]}</div>

                    <div className="col-6">{game.playerOneMoves[2]}</div>
                    <div className="col-6">{game.playerTwoMoves[2]}</div>
                </div>
                <hr />
                <Link to='/games/on-play/:id'>Continue</Link>
            </div>
        </div>
    )
}

export default OnPlayGame