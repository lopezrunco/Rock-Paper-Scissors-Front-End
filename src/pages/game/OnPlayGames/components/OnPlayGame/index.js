import { Link } from 'react-router-dom'

import rockImg from '../../../../../assets/img/rock.png'
import paperImg from '../../../../../assets/img/paper.png'
import scissorsImg from '../../../../../assets/img/scissors.png'

import './style.scss'

function OnPlayGame({ game }) {

    // Generacion dinamica del historico de movimientos
    const movesPlayerOne = []
    const movesPlayerTwo = []
    // Movimientos jugador 1
    game.playerOneMoves.forEach(element => {
        // Piedra
        if (element === 3) {
            movesPlayerOne.push(<img className='move-img' src={rockImg} />)
            // Papel
        } else if (element === 2) {
            movesPlayerOne.push(<img className='move-img' src={paperImg} />)
        } else if (element === 1) {
            // Tijera
            movesPlayerOne.push(<img className='move-img' src={scissorsImg} />)
        } else {
            movesPlayerOne.push(<h5>{element}</h5>)
        }
    })
    // Movimientos jugador 2
    game.playerTwoMoves.forEach(element => {
        // Piedra
        if (element === 3) {
            movesPlayerTwo.push(<img className='move-img' src={rockImg} />)
            // Papel
        } else if (element === 2) {
            movesPlayerTwo.push(<img className='move-img' src={paperImg} />)
        } else if (element === 1) {
            // Tijera
            movesPlayerTwo.push(<img className='move-img' src={scissorsImg} />)
        } else {
            movesPlayerTwo.push(<h5>{element}</h5>)
        }
    })

    return (
        <div className="col-md-4 onplay-game-wrapper">
            <div className='game-card--onplay'>
                <div className="row">
                    {/* TODO: Mostrar la fecha de iniciado el juego */}
                    <div className="col-6 moves-col">
                        <h6 className='mb-4'>You</h6>
                        {movesPlayerOne}
                    </div>
                    <div className="col-6 moves-col">
                        <h6 className='mb-4'>{game.playerTwoNickname}</h6>
                        {movesPlayerTwo}
                    </div>
                </div>
            </div>
            <Link to='/games/on-play/:id' className='primary-button'>Continue</Link>
        </div>
    )
}

export default OnPlayGame