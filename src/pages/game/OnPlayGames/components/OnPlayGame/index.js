import { Link } from 'react-router-dom'

import { AuthContext } from '../../../../../App'
import { useContext } from 'react'

import rockImg from '../../../../../assets/img/rock.png'
import paperImg from '../../../../../assets/img/paper.png'
import scissorsImg from '../../../../../assets/img/scissors.png'
import questionImg from '../../../../../assets/img/question.png'
import './style.scss'

function OnPlayGame({ game }) {
    const { state: authState } = useContext(AuthContext)

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

    const questionImgTag = <img className='question-img' src={questionImg} alt='Question' />

    // Chequea que jugador va adelante del otro y oculta su jugada
    if (movesPlayerOne.length > movesPlayerTwo.length) {        // Jugador 1 va delante del jugador 2
        movesPlayerOne.splice(-1, 1, questionImgTag)
    } else if (movesPlayerOne.length < movesPlayerTwo.length) { // Jugador 2 va delante del jugador 1
        movesPlayerTwo.splice(-1, 1, questionImgTag)
    }

    // Dependiendo si el usuario logueado va delante en la jugada o no, habilita o deshabilita el boton de continuar
    let allowContinueButton
    if (movesPlayerOne.length < movesPlayerTwo.length && game.playerOneId === authState.user.id) {
        allowContinueButton = true
    } else if (movesPlayerOne.length > movesPlayerTwo.length && game.playerTwoId === authState.user.id) {
        allowContinueButton = true
    } else if (movesPlayerOne.length === movesPlayerTwo.length && game.playerOneId === authState.user.id) {   // Si los dos van parejos, habilita a que mueva el player one
        allowContinueButton = true
    }

    return (
        <div className="col-12 col-lg-4 onplay-game-wrapper">
            <div className='game-card--onplay'>
                <div className="row">
                    {/* TODO: Mostrar la fecha de iniciado el juego */}
                    <div className="col-6 moves-col">
                        <h6 className='mb-4'>{game.playerOneNickname}</h6>
                        {movesPlayerOne}
                    </div>
                    <div className="col-6 moves-col">
                        <h6 className='mb-4'>{game.playerTwoNickname}</h6>
                        {movesPlayerTwo}
                    </div>
                </div>
            </div>
            {allowContinueButton && (
                <Link to={`/games/play/${game.id}`} className='primary-button'>Continue</Link>
            )}
        </div>
    )
}

export default OnPlayGame