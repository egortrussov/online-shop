import React, { Component, createRef } from 'react'

import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import CategoriesContainer from './CategoriesContainer/CategoriesContainer';

export default class Items extends Component {

    state = {
        category: null,
        isLoading: true,
        searchType: 'category',
        items: []
    }

    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.articleFormRef = createRef();
    }

    loadItems() {
        const { category } = this.state;

        this.setState({
            ...this.state,
            isLoading: true
        })

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

    findItemByArticle(e) {
        e.preventDefault();

        const formEl = this.articleFormRef.current;

        const formData = new FormData(formEl);

        this.setState({
            ...this.state,
            items: []
        })

        fetch(`${ this.context.proxy }/api/items/itemInfoByArticle/${ formData.get('article') }`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    ...this.state,
                    items: [res.item]
                })

                let items = [res.item];
                let item = res.item

                fetch(`${ this.context.proxy }/api/items/itemImage/${ res.item._id }`)
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
    }

    render() {
        const { category, isLoading, items, searchType } = this.state;

        return (
            <div>
                <CategoriesContainer 
                    setCategory={ (category) => this.setCategory(category) }
                    searchType={ searchType }
                /> 
                <span>Search by article</span>
                <form ref={ this.articleFormRef } onSubmit={ (e) => this.findItemByArticle(e) }>
                    <input type="text" name="article" />
                    <input type="submit" value="find" />
                </form>
                Items page
                { category && (
                    <h2>{ category.name }</h2>
                ) }
                {
                    items ? 
                        items.map(item => {
                            console.log(item)
                            return (
                                <Link to={ `/item/${ item._id }` }>
                                    { item.imageData && <img width="200" height="200" src={ item.imageData } alt=""/> }
                                    { item.title }
                                </Link>
                            )
                        })
                    : <h1>Loading...</h1>
                }
            </div>
        )
    }
}
