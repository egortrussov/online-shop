import React, { Component, createContext } from 'react'
import ls from 'local-storage'

export const ShoppingCartContext = createContext();

class ShoppingCartContextProvider extends Component {
    state = {
        items: []
    }

    addToShoppingCart(itemId) {
        if (!this.items.find(item => item.itemId === itemId))
            this.items.push({
                itemId,
                quantity: 1
            })
        else
            console.log('no')
    }

    render() {

        return (
            <ShoppingCartContext.Provider
                value={ {
                    ...this.state,
                    addToShoppingCart: this.addToShoppingCart
                } }
            >
                { this.props.children }
            </ShoppingCartContext.Provider>
        )
    }
}

export default ShoppingCartContextProvider