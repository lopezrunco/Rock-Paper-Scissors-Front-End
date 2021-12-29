import { useParams } from "react-router-dom"

function Play() {
    const { id } = useParams()

    return (
        <main>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <p>Play game {id}</p>
                    </div>

                    <div className='col-12'>

                    </div>

                </div>
            </div>
        </main>
    )
}

export default Play