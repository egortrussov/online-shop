import React, { Component, createRef } from 'react'

import { Link } from 'react-router-dom'

import { ItemContext } from '../../contexts/ItemContext'
import CategoriesList from '../CategoriesList/CategoriesList'

import './css/Items.css'
import ChooseSeachType from './ChooseSeachType'

export default class Items extends Component {

    state = {
        category: null,
        isLoading: true,
        searchType: 'category',
        items: [],
        categories: null
    }

    static contextType = ItemContext;

    constructor(props) {
        super(props);

        this.articleFormRef = createRef();
        this.itemNameFormRef = createRef();
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

    componentDidMount() {
        console.log(this.context.categories ? false : true)
        this.setState({
            category: this.context.currentCategory,
            items: this.context.items,
            isLoading: this.context.items.length ? false : true,
            categories: this.context.categories
        }, () => {
            if (this.context.currentCategory) 
                this.loadItems()
        })
    }

    setCategory(category) {
        const currentCategory = this.state.category;

        if (currentCategory === category)
            return;
        
        this.context.setCategory(category)

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

        this.context.setSearchType('article');

        const formEl = this.articleFormRef.current;

        const formData = new FormData(formEl);

        this.setState({
            ...this.state,
            items: [],
            isLoading: true
        })

        fetch(`${ this.context.proxy }/api/items/itemInfoByArticle/${ formData.get('article') }`)
            .then(res => res.json())
            .then(res => {
                if (!res.item) {
                    this.context.setItems([])
                    return this.setState({
                        ...this.state,
                        isLoading: false,
                        items: []
                    })
                }

                this.setState({
                    ...this.state,
                    items: [res.item],
                    isLoading: false
                })

                let items = [res.item];
                let item = res.item;

                fetch(`${ this.context.proxy }/api/items/itemImage/${ res.item._id }`)
                    .then(res => res.blob())
                    .then(res => {
                        let reader = new FileReader();
                        reader.readAsDataURL(res); 

                        const update = () => {
                            this.context.setItems(items);
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

    findItemsByName(e) {
        e.preventDefault();

        const formEl = this.itemNameFormRef.current;

        this.context.setSearchType('name');

        const formData = new FormData(formEl);

        this.setState({
            ...this.state,
            items: [],
            isLoading: true
        })

        fetch(`${ this.context.proxy }/api/items/itemsByName/${ formData.get('itemName') }`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    ...this.state,
                    items: res.items,
                    isLoading: false
                })

                let items = res.items;
                
                items.forEach(item => {

                    fetch(`${ this.context.proxy }/api/items/itemImage/${ item._id }`)
                        .then(res => res.blob())
                        .then(res => {
                            let reader = new FileReader();
                            reader.readAsDataURL(res); 

                            const update = () => {
                                this.context.setItems(items)
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

    setCurrentSearchType(type) {
        this.setState({
            currentSearchType: type
        })
        this.context.setSearchType(type)
        console.log(type)
    }

    render() {
        const { category, isLoading, items, searchType, categories } = this.state;

        console.log(categories, 'categ', categories ? false : true)

        return (
            <div className="content-container">
                <CategoriesList 
                    setCategory={ (category) => this.setCategory(category) }
                    searchType={ searchType }
                    isCategoryChosen={ category ? true : false } 
                    hasToLoadCategories={ categories ? false : true }
                    itemContext={ this.context }
                    currentCategory={ category }
                /> 
                <div className="content">

                    <div className="search-block">
                        <ChooseSeachType
                            setCurrentSearchType={ (type) => this.setCurrentSearchType(type) }
                         />
                        <form ref={ this.searchCreds }>
                            <input type="text" name="name" />
                            <button className="btn-submit">Find</button>
                        </form>
                    </div>


                    {/* <span>Search by article</span>
                    <form ref={ this.articleFormRef } onSubmit={ (e) => this.findItemByArticle(e) }>
                        <input type="text" name="article" />
                        <input type="submit" value="find" />
                    </form>
                    <span>Search by name</span>
                    <form ref={ this.itemNameFormRef } onSubmit={ (e) => this.findItemsByName(e) }>
                        <input type="text" name="itemName" />
                        <input type="submit" value="find" />
                    </form> */}
                    Items page
                    { category && (
                        <h2>{ category.name }</h2>
                    ) }
                    {
                        isLoading && <h1>Loading...</h1>
                    }
                    {
                        (!items.length && !isLoading) && <h1>No items found!</h1> 
                    }
                    {
                        items ? ((!items.length && !isLoading) && <h1>No items found!</h1>) : ''
                    }
                    {
                        items ? 
                            items.map(item => {
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
            </div>
        )
    }
}
