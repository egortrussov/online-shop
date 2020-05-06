import React, { Component } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
import CategoriesContainer from './CategoriesContainer/CategoriesContainer';

export default class Items extends Component {

    state = {
        category: null,
        isLoading: true,
        items: []
    }

    static contextType = AuthContext;

    loadItems() {
        const { category } = this.state;

        fetch(`${ this.context.proxy }/api/items/categoryItems/${ category._id }`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                let { items } = res;
                this.setState({
                    items: res.items,
                    isLoading: false
                })

                res.items.forEach(item => {
                    fetch(`${ this.context.proxy }/api/items/itemImage/${ item._id }`)
                        .then(res => res.blob())
                        .then(res => {
                            let reader = new FileReader();
                            reader.readAsDataURL(res); 

                            const update = () => {
                                this.setState({
                                    ...this.state,
                                    items
                                })
                            }

                            reader.onloadend = function() {
                                let base64data = reader.result;      
                                for (let i = 0; i < items.length; i++) {
                                    let currItem = items[i];
                                    if (currItem._id === item._id) {
                                        console.log(i)
                                        items[i].imageData = base64data;
                                        update()
                                        break;
                                    }
                                }
                            }
                        })
                })
            }) 
    }

    setCategory(category) {
        const currentCategory = this.state.category;
        if (currentCategory === category)
            return;

        this.setState({
            ...this.state,
            category,
            items: [],
            isLoading: true
        }, () => {
            this.loadItems()
        })
        
    }

    render() {
        const { category, isLoading, items } = this.state;

        return (
            <div>
                <CategoriesContainer 
                    setCategory={ (category) => this.setCategory(category) }
                />
                Items page
                { category && (
                    <h2>{ category.name }</h2>
                ) }
                {
                    items ? 
                        items.map(item => {
                            console.log(item)
                            return (
                                <>
                                    { item.imageData && <img src={ item.imageData } alt=""/> }
                                    { item.title }
                                </>
                            )
                        })
                    : <h1>Loading...</h1>
                }
            </div>
        )
    }
}
