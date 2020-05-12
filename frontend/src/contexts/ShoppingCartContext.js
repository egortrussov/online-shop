import React, { Component, createContext } from 'react'
import ls from 'local-storage'

export const ShoppingCartContext = createContext();

class ShoppingCartContextProvider extends Component {
    state = {
        items: ls.get('shoppingCart') || []
    }

    componentWillMount() {
        let items = ls.get('shoppingCart');
        console.log(items === null)
        if (!items || items === null)
            items = [];
        console.log(items)
        this.items = items
    }
    

    addToShoppingCart(itemId) {
        if (this.items)
            if (!this.items.find(item => item.itemId === itemId))
                this.items.push({
                    itemId,
                    quantity: 1
                })
        if (!this.items) {
            this.items.push({
                itemId,
                quantity: 1
            })
        }
        ls.set('shoppingCart', this.items)

        return this.items;
    }

    deleteItem(itemId) {
        console.log(itemId)
        let newItems = this.items.filter(item => item.itemId !== itemId)
        this.items = newItems;
        ls.set('shoppingCart', this.items)

        return this.items
    }

    changeItemQuantity(itemId, qty) {
        let items = this.items;
        for (let i = 0; i < items.length; i++) 
            if (items[i].itemId === itemId) {
                items[i].quantity = qty;
                break;
            }
        this.items = items;

        return items;
    }

    clearCart() {
        this.items = [];
        ls.set('shoppingCart', []);
    }

    render() {

        return (
            <ShoppingCartContext.Provider
                value={ {
                    ...this.state,
                    addToShoppingCart: this.addToShoppingCart,
                    deleteItem: this.deleteItem,
                    changeItemQuantity: this.changeItemQuantity,
                    clearCart: this.clearCart
                } }
            >
                { this.props.children }
            </ShoppingCartContext.Provider>
        )
    }
}

export default ShoppingCartContextProvider