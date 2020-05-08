import React, { Component } from 'react'

import { ShoppingCartContext } from '../../../contexts/ShoppingCartContext'

export default class AddToShoppingCart extends Component {

    state = {

    }

    static contextType = ShoppingCartContext;

    addToShoppingCart() {
        const { itemId } = this.props;

        this.context.addToShoppingCart(itemId)
    }

    render() {
        return (
            <button onClick={ () => this.addToShoppingCart() }>
                Add to shopping cat
            </button>
        )
    }
}
