import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

export default class AddToShoppingCartBtn extends Component {
    render() {
        return (
            <>
                <button>
                    <FontAwesomeIcon icon={ faCartPlus } />
                </button>
            </>
        )
    }
}
