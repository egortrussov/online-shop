import React, { Component } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

export default class ManageCategories extends Component {

    state = {
        isLoading: true,
        categories: []
    }

    static contextType = AuthContext;

    componentDidMount() {
        fetch(`${ this.context.proxy }/api/categories/allCategories`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    isLoading: false,
                    categories: res.categories
                })
            })
    }

    addCategory(e) {
        e.preventDefault();

        
    }    

    render() {
        const { isLoading, categories } = this.state;

        if (isLoading) return (
            <h1>Loading...</h1>
        )

        return (
            <div>
                {
                    categories.map(category => (
                        <div className="category-block">
                            <button>delete</button>
                            <span>{ category.name } </span>
                        </div>
                    ))
                }
                <form onSubmit={ (e) => this.addCategory(e) } className="add-category">
                    <input type="text" name="name" />
                    <button>Add</button>
                </form>
            </div>
        )
    }
}
