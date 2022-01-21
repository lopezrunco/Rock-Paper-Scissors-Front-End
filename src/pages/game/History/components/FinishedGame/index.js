import { useState } from 'react'
import { TrophyFill } from 'react-bootstrap-icons'

import rockImg from '../../../../../assets/img/rock.png'
import paperImg from '../../../../../assets/img/paper.png'
import scissorsImg from '../../../../../assets/img/scissors.png'
import './style.scss'

function FinishedGame({ game }) {

    // Manejo de estado para mostrar o no detalles de la partida
    const [openWinnerDetails, setOpenWinnerDetails] = useState(false)

    const handleClick = () => {
        setOpenWinnerDetails(!openWinnerDetails)
    }

    const movesPlayerOne = []
    const movesPlayerTwo = []
    let playerOneWins = 0
    let playerTwoWins = 0
    let draw = 0
    let winnerNickname = ''

    // Generacion dinamica del historico de movimientos player 1
    game.playerOneMoves.forEach(element => {
        if (element === 1) {
            movesPlayerOne.push(<img className='move-img' src={rockImg} alt='Rock' />)
        } else if (element === 2) {
            movesPlayerOne.push(<img className='move-img' src={paperImg} alt='Paper' />)
        } else if (element === 3) {
            movesPlayerOne.push(<img className='move-img' src={scissorsImg} alt='Scissors' />)
        } else {
            movesPlayerOne.push(<h5>{element}</h5>)
        }
    })
    // Generacion dinamica del historico de movimientos player 2
    game.playerTwoMoves.forEach(element => {
        if (element === 1) {
            movesPlayerTwo.push(<img className='move-img' src={rockImg} alt='Rock' />)
        } else if (element === 2) {
            movesPlayerTwo.push(<img className='move-img' src={paperImg} alt='Paper' />)
        } else if (element === 3) {
            movesPlayerTwo.push(<img className='move-img' src={scissorsImg} alt='Scissors' />)
        } else {
            movesPlayerTwo.push(<h5>{element}</h5>)
        }
    })

    // Debe de haberse terminado la partida para definir el ganador
    if (game.movesWinners.length === 3) {

        // Itera por el array de ganadores y empuja un valor segun el caso
        function findWinner() {
            game.movesWinners.forEach(arrayElement => {
                switch (arrayElement) {
                    case game.playerOneId:
                        playerOneWins++
                        break;
                    case game.playerTwoId:
                        playerTwoWins++
                        break;
                    case 0:
                        draw++
                        break;
                    default:
                        break;
                }
            })

            // Definicion del ganador
            if (playerOneWins === 3 && playerTwoWins === 0) {                       // Gana el 1
                winnerNickname = game.playerOneNickname
            } else if (playerTwoWins === 3 && playerOneWins === 0) {                // Gana el 2
                winnerNickname = game.playerTwoNickname
            } else if (playerOneWins === 2 && playerTwoWins === 1) {                // Gana el 1
                winnerNickname = game.playerOneNickname
            } else if (playerTwoWins === 2 && playerOneWins === 1) {                // Gana el 2
                winnerNickname = game.playerTwoNickname
            } else if (playerOneWins === 2 && draw === 1) {                         // Gana el 1
                winnerNickname = game.playerOneNickname
            } else if (playerTwoWins === 2 && draw === 1) {                         // Gana el 2
                winnerNickname = game.playerTwoNickname
            } else if (playerOneWins === 2 && draw === 0) {                         // Gana el 1
                winnerNickname = game.playerOneNickname
            } else if (playerTwoWins === 2 && draw === 0) {                         // Gana el 2
                winnerNickname = game.playerTwoNickname
            } else if (playerOneWins === 1 && draw === 0) {                         // Gana el 1
                winnerNickname = game.playerOneNickname
            } else if (playerTwoWins === 1 && draw === 0) {                         // Gana el 2
                winnerNickname = game.playerTwoNickname
            } else if (draw === 2 && playerOneWins === 1) {                         // Gana el 1
                winnerNickname = game.playerOneNickname
            } else if (draw === 2 && playerTwoWins === 1) {                         // Gana el 2
                winnerNickname = game.playerTwoNickname
            } else if (draw === 3) {                                                // Empate
                winnerNickname = 'Draw!'
            } else if (draw === 1 && playerOneWins === 1 && playerTwoWins === 1) {  // Empate
                winnerNickname = 'Draw!'
            } else {
                winnerNickname = "Couldn't get the winner"
            }
        }

        findWinner()
    }

    return (
        <div className='col-lg-6'>
            <div className='row finished-game game-card--played'>

                {/* Jugador 1 */}
                <div className='col-6 text-truncate'>
                    <h6>{game.playerOneNickname}</h6>
                </div>
                <div className='col-6'>
                    <div className='grid'>
                        {movesPlayerOne}
                    </div>
                </div>
                <hr />
                {/* Jugador 2 */}
                <div className='col-6 text-truncate'>
                    <h6>{game.playerTwoNickname}</h6>
                </div>
                <div className='col-6'>
                    <div className='grid'>
                        {movesPlayerTwo}
                    </div>
                </div>

            </div>
            <span onClick={handleClick} className='winner-card'><TrophyFill /><strong>{winnerNickname}</strong></span>
            
            {
                openWinnerDetails === true &&
                <div className='winner-details' onClick={handleClick}>
                    <span className='winner'>
                        <TrophyFill /><strong>{winnerNickname}</strong>
                    </span>
                    <span className='details'>
                        <p>Game details:</p>
                        <p><strong>{game.playerOneNickname}:</strong> {playerOneWins}</p>
                        <p><strong>{game.playerTwoNickname}:</strong> {playerTwoWins}</p>
                        <p><strong>Draws:</strong> {draw}</p>
                    </span>
                </div>
            }

        </div>

    )
}

export default FinishedGame