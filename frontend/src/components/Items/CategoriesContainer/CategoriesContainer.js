import React, { Component } from 'react'

import { AuthContext } from '../../../contexts/AuthContext'

export default class CategoriesContainer extends Component {

    state = {
        isLoading: true,
        categories: null
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
                console.log(res)
                this.props.setCategory(res.categories[0])
            })
    }
    

    render() {
        const { isLoading, categories } = this.state;

        if (isLoading) return <h1>Loading</h1>

        return (
            <div>
                {
                    categories.map(category => {
                        return (
                            <button onClick={ () => this.props.setCategory(category) }>{ category.name }</button>
                        )
                    })
                }
            </div>
        )
    }
}
