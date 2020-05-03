import React, { Component } from 'react'

import { connect } from 'react-redux'
import { getItems } from '../store/actions/actions'

import { ItemContext } from '../contexts/ItemContext'

class Items extends Component {

    static contextType = ItemContext;

    componentDidMount() {
        console.log(this.context)
    }
    
    
    render() {
        return (
            <ItemContext.Consumer>
                { items => {
                    console.log(items)
                } }
            </ItemContext.Consumer>
        )
    }
}
export default Items
