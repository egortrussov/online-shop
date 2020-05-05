import React, { Component } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
import CategoriesContainer from './CategoriesContainer/CategoriesContainer';

export default class Items extends Component {

    state = {
        category: null,
        isLoading: true,

    }

    static contextType = AuthContext;

    setCategory(category) {
        this.setState({
            ...this.state,
            category
        })
        console.log(category)
    }

    loadItems() {
        const { category } = this.state;

        // ...
    }

    render() {
        const { category } = this.state;

        console.log(category)

        return (
            <div>
                <CategoriesContainer 
                    setCategory={ (category) => this.setCategory(category) }
                />
                Items page
                { category && (
                    <h2>{ category.name }</h2>
                ) }
                
            </div>
        )
    }
}
