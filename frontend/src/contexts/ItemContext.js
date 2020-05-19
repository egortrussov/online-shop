import React, { Component, createContext } from 'react'

import { getProxy } from './ContextMiddleware'

export const ItemContext = createContext();

class ItemContextProvider extends Component {
    state = {
        items: [],
        currentCategory: null,
        proxy: getProxy()
    }

    setCurrentCategory(category) {
        this.currentCategory = category;
    }

    setItems(items) {
        this.items = items;
    }

    render() {

        return (
            <ItemContext.Provider value={ {
                ...this.state,
                setCategory: this.setCurrentCategory,
                setItems: this.setItems
            } }>
                { this.props.children }
            </ItemContext.Provider>
        )
    }
}

export default ItemContextProvider