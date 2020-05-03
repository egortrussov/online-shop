import React, { Component, createContext } from 'react'

import { getProxy } from './ContextMiddleware'

export const ItemContext = createContext();

class ItemContextProvider extends Component {
    state = {
        items: [10]
    }

    addItem(item) {
        console.log(this.items)
        console.log(getProxy())
        this.items.push(item)
    }

    render() {

        return (
            <ItemContext.Provider value={ {
                ...this.state,
                addItem: this.addItem
            } }>
                { this.props.children }
            </ItemContext.Provider>
        )
    }
}

export default ItemContextProvider