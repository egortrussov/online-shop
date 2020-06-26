import React, { Component } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

export default class PopularItemsSlider extends Component {

    state = {

    }
    

    render() {
        return (
            <div>
                { this.props.items.length }
            </div>
        )
    }
}
