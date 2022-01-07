import React from "react"
import './style.scss'

function Loader() {
    const text = [
        'Turning on the bat signal',
        'Building Death Star lego',
        'Charging the Green Lantern ring',
        'Creating Spiderman web fluid',
        'Ascending to Valhalla',
        'Finishing A+ Full Stack Dev',
        'Avenging the death of Ragnar Lothbrok',
        'Elaborating Alcatraz escape plan',
        'Calling Mr. Madman'
    ]
    let randomText = text[Math.floor(Math.random()*text.length)]

    return (
        <div className='loader'>
            <div className="loader-element"></div>
            <h5>Please wait...</h5>
            <small>{randomText}</small>
        </div>
    )
}

export default Loader