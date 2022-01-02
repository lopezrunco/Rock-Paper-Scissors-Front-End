import React, { useState, useEffect } from 'react'
import { Scissors, Newspaper, HeptagonFill, Question } from 'react-bootstrap-icons'

// Elementos del juego
const choices = [
  {
    id: 1,
    name: 'rock',
    component: HeptagonFill,
    losesToItemId: 2
  }, {
    id: 2,
    name: 'paper',
    component: Newspaper,
    losesToItemId: 3
  }, {
    id: 3,
    name: 'scissors',
    component: Scissors,
    losesToItemId: 1
  }
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
    if (chosenChoise.losesToItemId === secondUserChoice.id) {
      // Pierde
      setLosses(losses => losses + 1)
      setGameState('lose')
    } else if (secondUserChoice.losesToItemId === chosenChoise.id) {
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
    <div className="App">
      <div className='container'>

        <div className='row'>
          <div className='col-6 border'>
            {/* Informacion del usuario */}
            <h2>Single player</h2>
          </div>
          <div className='col-6 wins-losses border'>
            {/* Jugadas perdidas y ganadas */}
            <div className='row'>
              <div className='wins col-6'>
                <p className='number'>{wins}</p>
                <p className='text'>{wins === 1 ? 'Win' : 'Wins'}</p>
              </div>
              <div className='losses col-6'>
                <p className='number'>{losses}</p>
                <p className='text'>{losses === 1 ? 'Loss' : 'Losses'}</p>
              </div>
            </div>
          </div>
        </div>


        {/* 
          Modal que muestra resultado de la jugada. 
          Se muestra solo si gameState tiene valor.
          Segun el estado del juego cambia de color y mensaje
        */}
        {gameState && (
          <div className={`game-state ${gameState}`}>
            <p>{renderComponent(userChoice)}</p>

            {gameState === 'win' && <p>You won!</p>}
            {gameState === 'lose' && <p>You lost!</p>}
            {gameState === 'draw' && <p>You drew!</p>}

            <p>{renderComponent(secondUserChoice)}</p>

            <button onClick={() => restartGame()}>Play again!</button>
          </div>
        )}

        <div className='choices row'>
          {/* Elementos que elige cada jugador */}
          <div className='col-6'><p>You</p></div>
          <div className='col-6'><p>Player 2</p></div>

          {/* Botones para jugar */}
          <div className='col-6'>
            <button className='rock' onClick={() => handleUserChoice(1)}>
              <HeptagonFill />
            </button>
            <button className='paper' onClick={() => handleUserChoice(2)}>
              <Newspaper />
            </button>
            <button className='scissors' onClick={() => handleUserChoice(3)}>
              <Scissors />
            </button>
          </div>

          {/* Muestra la jugada del player 2 */}
          <div className='col-6'>
            <button className='second-user-choice'>
              <Question />
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default App
