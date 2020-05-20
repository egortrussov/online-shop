import React, { Component } from 'react'

import { AuthContext } from '../../../contexts/AuthContext'

export default class CategoriesContainer extends Component {

    state = {
        isLoading: true,
        categories: this.props.categories
    }

    static contextType = AuthContext;

    componentDidMount() {

        console.log(this.props.hasToLoadCategories, 'jojojojoj')

        if (!this.props.hasToLoadCategories)
            return;

        fetch(`${ this.context.proxy }/api/categories/allCategories`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    isLoading: false,
                    categories: res.categories
                })
                console.log('kkkkkk')
                this.props.itemContext.setCategories(res.categories);
                if (!this.props.isCategoryChosen)
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
