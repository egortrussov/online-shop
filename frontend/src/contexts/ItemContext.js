import React, { Component, createContext } from 'react'

import { getProxy } from './ContextMiddleware'

export const ItemContext = createContext();

class ItemContextProvider extends Component {
    state = {
        items: [],
        currentCategory: null,
        currentSearchType: 'category',
        proxy: getProxy()
    }

    setCurrentCategory(category) {
        this.currentCategory = category;
    }

    setItems(items) {
        this.items = items;
    }

    setCurrentSearchType(type) {
        this.currentSearchType = type;
    }

    render() {

        return (
            <ItemContext.Provider value={ {
                ...this.state,
                setCategory: this.setCurrentCategory,
                setItems: this.setItems,
                setSearchType: this.setCurrentCategory
            } }>
                { this.props.children }
            </ItemContext.Provider>
        )
    }
}

export default ItemContextProvider