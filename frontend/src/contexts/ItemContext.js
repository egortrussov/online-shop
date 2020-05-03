import React, { Component, createContext } from 'react'

export const ItemContext = createContext();

class ItemContextProvider extends Component {
    state = {
        items: []
    }

    render() {

        return (
            <ItemContext.Provider value={ {
                ...this.state,
            } }>
                { this.props.children }
            </ItemContext.Provider>
        )
    }
}

export default ItemContextProvider