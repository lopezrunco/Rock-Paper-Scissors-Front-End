import { ExclamationCircle } from 'react-bootstrap-icons'

import './style.scss'

function FetchError() {
    return (
        <div className='col-12'>
            <div className="fetch-error-message">
            <ExclamationCircle />
            <h5>Error</h5>
            <p>Couldn't retrieve information from server</p>
        </div>
        </div>
    )
}

export default FetchError