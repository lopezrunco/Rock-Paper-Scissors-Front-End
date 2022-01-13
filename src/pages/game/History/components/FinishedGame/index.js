import { TrophyFill } from 'react-bootstrap-icons'

import rockImg from '../../../../../assets/img/rock.png'
import paperImg from '../../../../../assets/img/paper.png'
import scissorsImg from '../../../../../assets/img/scissors.png'
import './style.scss'

function FinishedGame({ game }) {
    // Generacion dinamica del historico de movimientos
    const movesPlayerOne = []
    const movesPlayerTwo = []
    // Movimientos jugador 1
    game.playerOneMoves.forEach(element => {
        // Piedra
        if (element === 1) {
            movesPlayerOne.push(<img className='move-img' src={rockImg} alt='Rock' />)
            // Papel
        } else if (element === 2) {
            movesPlayerOne.push(<img className='move-img' src={paperImg} alt='Paper' />)
        } else if (element === 3) {
            // Tijera
            movesPlayerOne.push(<img className='move-img' src={scissorsImg} alt='Scissors' />)
        } else {
            movesPlayerOne.push(<h5>{element}</h5>)
        }
    })
    // Movimientos jugador 2
    game.playerTwoMoves.forEach(element => {
        // Piedra
        if (element === 1) {
            movesPlayerTwo.push(<img className='move-img' src={rockImg} alt='Rock' />)
            // Papel
        } else if (element === 2) {
            movesPlayerTwo.push(<img className='move-img' src={paperImg} alt='Paper' />)
        } else if (element === 3) {
            // Tijera
            movesPlayerTwo.push(<img className='move-img' src={scissorsImg} alt='Scissors' />)
        } else {
            movesPlayerTwo.push(<h5>{element}</h5>)
        }
    })

    // Define el ganador del juego retornando el id que se repite en el array
    let winner = ''
    let winnerNickname = ''

    if (game.movesWinners.length === 3) {
        function findWinner() {
            for (let findWinnerIndex = 0; findWinnerIndex < game.movesWinners.length; findWinnerIndex++) {
                if (game.movesWinners[findWinnerIndex + 1] === game.movesWinners[findWinnerIndex]) {
                    winner = game.movesWinners[findWinnerIndex]
                }
            }
        }
        findWinner()
    }

    function foundWinnerNickname() {
        if (winner === game.playerOneId) {
            winnerNickname = game.playerOneNickname
        } else if (winner === game.playerTwoId) {
            winnerNickname = game.playerTwoNickname
        } else if (winner === 0) {
            winnerNickname = ''
        }
    }
    foundWinnerNickname()

    return (
        <div className='col-md-6'>
            <div className='row finished-game game-card--played'>

                {/* Jugador 1 */}
                <div className='col-6'>
                    <h6>{game.playerOneNickname}</h6>
                </div>
                <div className='col-6'>
                    <div className='grid'>
                        {movesPlayerOne}
                    </div>
                </div>
                <hr />
                {/* Jugador 2 */}
                <div className='col-6'>
                    <h6>{game.playerTwoNickname}</h6>
                </div>
                <div className='col-6'>
                    <div className='grid'>
                        {movesPlayerTwo}
                    </div>
                </div>

            </div>
            <span className='winner-card'><TrophyFill />{winnerNickname}</span>
        </div>
    )
}

export default FinishedGame