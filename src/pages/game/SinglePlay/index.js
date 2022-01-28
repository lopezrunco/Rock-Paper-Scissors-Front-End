import React, { useState, useEffect } from 'react'

import FadeIn from '../../../components/FadeIn'
import Scissors from './components/Scissors'
import Rock from './components/Rock'
import Paper from './components/Paper'
import Question from './components/Question'
import './style.scss'

// Elementos del juego
const choices = [
    { id: 1, name: 'rock', component: Rock, losesTo: 2 },
    { id: 2, name: 'paper', component: Paper, losesTo: 3 },
    { id: 3, name: 'scissors', component: Scissors, losesTo: 1 }
]

function App() {
    // Estados que manejan las jugadas ganadas y perdidas
    const [wins, setWins] = useState(0)
    const [losses, setLosses] = useState(0)

    // Estado que maneja la eleccion del jugador local y el jugador 2
    const [userChoice, setUserChoice] = useState(null)
    const [secondUserChoice, setSecondUserChoice] = useState(null)

    // Estado que maneja si el juego esta ganado, perdido o empatado
    const [gameState, setGameState] = useState(null)

    useEffect(() => {
        restartGame()
    }, [])

    // Setea el estado por defecto, elige la jugada del player 2 y setea en el estado
    function restartGame() {
        setGameState(null)
        setUserChoice(null)
        const randomChoice = choices[Math.floor(Math.random() * choices.length)]
        setSecondUserChoice(randomChoice)
    }

    // Recibe el indice del boton con el que invoco la funcion
    // Busca el boton ejecutado y lo setea en el estado como la eleccion del jugador 
    function handleUserChoice(choice) {
        const chosenChoise = choices.find(choiceItem => choiceItem.id === choice)
        setUserChoice(chosenChoise)

        // Determina el ganador comparando los ids de los items
        // Setea el estado del juego
        // Agrega un valor a las partidas ganadas o perdidas
        if (chosenChoise.losesTo === secondUserChoice.id) {
            // Pierde
            setLosses(losses => losses + 1)
            setGameState('lose')
        } else if (secondUserChoice.losesTo === chosenChoise.id) {
            // Gana
            setWins(wins => wins + 1)
            setGameState('win')
        } else if (secondUserChoice.id === chosenChoise.id) {
            // Empate
            setGameState('draw')
        }
    }

    // Transforma la eleccion de ambos usuarios en un componente renderizable
    function renderComponent(choice) {
        const Component = choice.component
        return <Component />
    }

    return (
        <FadeIn>
            <main className="single-player-wrapper">
                <div className='container'>

                    <div className='row message-card'>
                        <div className='col-md-6'>
                            <div className=''>
                                <h3>Single player</h3>
                            </div>
                        </div>
                        <div className='col-md-6 wins-losses'>
                            {/* Jugadas perdidas y ganadas */}
                            <div className='wins'>
                                <h4 className='number'>{wins}</h4>
                                <h6 className='text'>{wins === 1 ? 'Win' : 'Wins'}</h6>
                            </div>
                            <div className='losses'>
                                <h4 className='number'>{losses}</h4>
                                <h6 className='text'>{losses === 1 ? 'Loss' : 'Losses'}</h6>
                            </div>
                        </div>
                    </div>

                    {/* Modal que muestra resultado de la jugada. 
                    Se muestra solo si gameState tiene valor y segun el estado del juego cambia de color y mensaje*/}

                    {gameState && (
                        <span onClick={() => restartGame()}>
                            <div className={`game-state ${gameState}`}>
                                <FadeIn>
                                    {gameState === 'win' && <h3 className='text-center mb-5'>You won!</h3>}
                                    {gameState === 'lose' && <h3 className='text-center mb-5'>You lost!</h3>}
                                    {gameState === 'draw' && <h3 className='text-center mb-5'>You drew!</h3>}
                                    <div className='show-moves'>
                                        <div className='move'>
                                            <h6>Your choice:</h6>
                                            <p>{renderComponent(userChoice)}</p>
                                        </div>
                                        <div className='move'>
                                            <h6>Random choice:</h6>
                                            <p>{renderComponent(secondUserChoice)}</p>
                                        </div>
                                    </div>
                                </FadeIn>
                            </div>
                        </span>
                    )}

                    <div className='choices row'>
                        {/* Botones para jugar */}
                        <div className='col-12 col-lg-8 user-choices'>
                            <p className='primary-button--freezed'>Your choices:</p>
                            <div className='message-card'>
                                <span className='rock' onClick={() => handleUserChoice(1)}><Rock /></span>
                                <span className='paper' onClick={() => handleUserChoice(2)}><Paper /></span>
                                <span className='scissors' onClick={() => handleUserChoice(3)}><Scissors /></span>
                            </div>
                        </div>

                        {/* Muestra la jugada del player 2 */}
                        <div className='col-12 col-lg-4 random-choices'>
                            <p className='primary-button--freezed'>Random choice:</p>
                            <div className='message-card'>
                                <span className='player-two-choice'><Question /></span>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </FadeIn>
    )
}

export default App
