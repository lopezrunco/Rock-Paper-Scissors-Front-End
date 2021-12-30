import { useState } from "react"
import { useParams } from "react-router-dom"

// Elementos del juego
const choices = [
    { "id": 1, "name": "rock", "losesTo": 2 },
    { "id": 2, "name": "paper", "losesTo": 3 },
    { "id": 3, "name": "scissors", "losesTo": 1 }
]

function Play() {
    const { id } = useParams()
    const [userMove, setUserMove] = useState(null)

    function handleUserChoice(choice) {
        const chosenChoise = choices.find(choiceItem => choiceItem.id === choice)
        setUserMove(chosenChoise)

        console.log(chosenChoise)
    }

    // TODO: llamar al endpoint y enviar la eleccion

    return (
        <main>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <p>Play game {id}</p>
                    </div>

                    <div className='col-12'>
                        <div className="row">
                            <div className="col-4">
                                <button className="rock" onClick={() => handleUserChoice(1)}>
                                    ROCK
                                </button>
                            </div>
                            <div className="col-4">
                                <button className="paper" onClick={() => handleUserChoice(2)}>
                                    PAPER
                                </button>
                            </div>
                            <div className="col-4">
                                <button className="scissors" onClick={() => handleUserChoice(3)}>
                                    SCISSORS
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default Play