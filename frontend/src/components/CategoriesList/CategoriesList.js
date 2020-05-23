import React, { Component } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

import './css/CategoriesList.css'

export default class CategoriesList extends Component {

    state = {
        isLoading: true,
        categories: this.props.categories,
        currentCategory: null
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
                if (!this.props.currentCategory) {
                    this.props.setCategory(res.categories[0]);
                    this.setState({
                        ...this.state,
                        currentCategory: res.categories[0]
                    })
                } else {
                    this.setState({
                        ...this.state,
                        currentCategory: this.props.currentCategory
                    })
                }
                    
            })
    }

    setCategory(category) {
        this.props.setCategory(category);
        this.setState({
            ...this.state,
            currentCategory: category
        })
    }
    

    render() {
        const { isLoading, categories, currentCategory } = this.state;
        console.log(categories)

        if (isLoading) return <h1>Loading</h1>

        return (
            <div className="categories-container">
                {
                    categories ? categories.map(category => {
                        let extraClassName = ''
                        if (currentCategory) 
                            extraClassName = category._id === currentCategory._id ? 'active' : ''

                        return (
                            <div className="list-item">
                                <button className={ extraClassName } onClick={ () => this.setCategory(category) }>{ category.name }</button>
                            </div>
                        )
                    }) : <></>
                }
            </div>
        )
    }
}