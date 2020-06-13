import React, { Component } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

import './css/CategoriesList.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default class CategoriesList extends Component {

    state = {
        isLoading: true,
        categories: this.props.categories,
        currentCategory: null,
        isActive: false
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
            currentCategory: category,
            isActive: false
        })
    }

    toggleBlock() {
        this.setState({
            ...this.state,
            isActive: !this.state.isActive
        })
    }    

    render() {
        const { isLoading, categories, currentCategory, isActive } = this.state;

        if (isLoading) return <h1>Loading</h1>

        return (
            <>
                
                <div className={ `categories-container ${ isActive ? 'active' : '' }` }>
                    
                    <div className="toggle-btn-container">
                        <button onClick={ () => this.toggleBlock() } className="toggle-view">
                            <FontAwesomeIcon icon={ faBars } />
                        </button>
                    </div>                
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

                {
                    window.innerWidth <= 810 &&
                    <div onClick={ () => this.toggleBlock() } className={ `overlay ${ isActive ? 'active' : '' }` }></div>

                }
            </>
        )
    }
}
