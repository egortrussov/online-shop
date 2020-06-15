import React, { Component, createRef } from 'react'
import ls from 'local-storage'

import { Link } from 'react-router-dom'

import { ItemContext } from '../../contexts/ItemContext'
import CategoriesList from '../CategoriesList/CategoriesList'

import './css/Items.css'
import ChooseSeachType from './ChooseSeachType'
import AddToShoppingCartBtn from './AddToShoppingCartBtn'

export default class Items extends Component {

    state = {
        category: null,
        isLoading: true,
        searchType: 'category',
        currentSearchType: null,
        items: [],
        categories: null,
        isCategoryChosen: false
    }

    static contextType = ItemContext;

    constructor(props) {
        super(props);

        this.articleFormRef = createRef();
        this.itemNameFormRef = createRef();
        this.searchCreds = createRef();
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
        this.setState({
            category: this.context.currentCategory,
            items: this.context.items,
            isLoading: this.context.items.length ? false : true,
            categories: this.context.categories,
            currentSearchType: this.context.currentSearchType
        }, () => {
            if (ls.get('currentSearchText')) {
                this.findItemsByName(ls.get('currentSearchText'))
                ls.set('currentSearchText', '')
                this.setState({
                    ...this.state,
                    isCategoryChosen: true
                })
            } else if (this.context.currentCategory) {
                this.loadItems()
            }                
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

    findItemByArticle(article) {
        this.context.setSearchType('article');

        this.setState({
            ...this.state,
            items: [],
            isLoading: true
        })

        fetch(`${ this.context.proxy }/api/items/itemInfoByArticle/${ article }`)
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
                                    items[i].imageData = base64data;
                                    update()
                                    break;
                                }
                            }
                        }
                    })
            })
    }

    findItemsByName(searchText) {
        this.context.setSearchType('name');

        this.setState({
            ...this.state,
            items: [],
            isLoading: true
        })

        fetch(`${ this.context.proxy }/api/items/itemsByName/${ searchText }`)
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

    findItemsByCompanyName(searchText) {
        this.context.setSearchType('company');

        this.setState({
            ...this.state,
            items: [],
            isLoading: true
        })

        fetch(`${ this.context.proxy }/api/items/itemsByCompanyName/${ searchText }`)
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
    }

    findItems(e) {
        e.preventDefault();

        const formEl = this.searchCreds.current;
        const formData = new FormData(formEl);

        const { currentSearchType } = this.state;

        const searchText = formData.get('name');

        switch (currentSearchType) {
            case 'name':
                this.findItemsByName(searchText);
                break;
            case 'article':
                this.findItemByArticle(searchText);
                break;
            case 'company':
                this.findItemsByCompanyName(searchText);
                break;
        
            default:
                this.setState({
                    currentSearchType: 'name'
                })
                this.findItemsByName(searchText);
        }
    }

    render() {
        const { category, isLoading, items, searchType, categories, currentSearchType, isCategoryChosen } = this.state;

        return (
            <div className="content-container">
                <CategoriesList 
                    setCategory={ (category) => this.setCategory(category) }
                    searchType={ searchType }
                    isCategoryChosen={ isCategoryChosen || (category ? true : false) } 
                    hasToLoadCategories={ categories ? false : true }
                    itemContext={ this.context }
                    currentCategory={ category }
                /> 
                <div className="content">

                    <div className="search-block">
                        <ChooseSeachType
                            setCurrentSearchType={ (type) => this.setCurrentSearchType(type) }
                            searchType={ currentSearchType }
                         />
                        <form ref={ this.searchCreds } onSubmit={ (e) => this.findItems(e) }>
                            <input type="text" name="name" />
                            <button className="btn-submit">Find</button>
                        </form>
                    </div>
                    {
                        isLoading && <h1>Loading...</h1>
                    }
                    {
                        items ? ((!items.length && !isLoading) && <h1>No items found!</h1>) : ''
                    }
                    <div className="items-container">
                        {
                            items ? 
                                items.map(item => {
                                    return (
                                        <div className="item-card">
                                            <Link to={ `/item/${ item._id }` }>
                                                <div className="card-left">
                                                    { item.imageData ? <img  src={ item.imageData } alt=""/> : <span>No image!</span> }
                                                </div>
                                            </Link>
                                            <Link to={ `/item/${ item._id }` }>
                                                <div className="card-middle">
                                                    <h3>{ item.title }</h3>
                                                    <p>Company: { item.company || 'No company' }</p>
                                                    <p>{ item.description }</p>
                                                    <p className="qty">Quantity: { item.quantity }</p>
                                                </div>
                                            </Link>
                                            <div className="card-right">
                                                <div className="price"> <span>Price: </span> { item.price }</div>
                                                <div className="bottom">
                                                    <AddToShoppingCartBtn itemId={ item._id } />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            : <h1>Loading...</h1>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
