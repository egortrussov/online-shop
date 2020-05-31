import React from 'react'
import { useHistory } from 'react-router-dom'

import './css/BackLink.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const BackLink = () => {
    const history = useHistory();

    const goBack = () => {
        history.goBack()
    }

    return (
        <div className="back-link" onClick={ () => goBack() }>
            <FontAwesomeIcon className="icon" icon={ faArrowLeft } />
            Back
        </div>
    )
}

export default BackLink
