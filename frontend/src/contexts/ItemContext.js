import React, { Component, createContext } from 'react'

import { getProxy } from './ContextMiddleware'

export const ItemContext = createContext();

class ItemContextProvider extends Component {
    state = {
        items: [],
        currentCategory: null,
        currentSearchType: null,
        proxy: getProxy(),
        currentSearchText: '',
        categories: null
    }

    setCurrentCategory(category) {
        this.currentCategory = category;
    }

    setItems(items) {
        this.items = items;
    }

    setCurrentSearchType(type) {
        this.currentSearchType = type;
        console.log(type, ';;;;;;')
    }

    setCategories(categories) {
        this.categories = categories;
    }

    setCurrentSearchText(text) {
        this.currentSearchText = text;
    }

    render() {

        return (
            <ItemContext.Provider value={ {
                ...this.state,
                setCategory: this.setCurrentCategory,
                setItems: this.setItems,
                setSearchType: this.setCurrentSearchType,
                setCategories: this.setCategories,
                setCurrentSearchText: this.setCurrentSearchText
            } }>
                { this.props.children }
            </ItemContext.Provider>
        )
    }
}

export default ItemContextProvider