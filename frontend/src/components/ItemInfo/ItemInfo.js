import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import AddToShoppingCart from './AddToShoppingCart/AddToShoppingCart';
import AddToShoppingCartBtn from '../Items/AddToShoppingCartBtn';

import './css/ItemInfo.css'
import LinkToCategory from './LinkToCategory';
import BackLink from '../ReusableComponents/BackLink/BackLink';

export default class ItemInfo extends Component {

    state = {
        isLoading: true,
        item: null,
        imageData: null,
        category: null
    }

    static contextType = AuthContext;

    componentDidMount() {
        const itemId = this.props.match.params.itemId;

        fetch(`${ this.context.proxy }/api/items/itemInfo/${ itemId }`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    ...this.state,
                    item: res.item,
                    isLoading: false 
                })

                fetch(`${ this.context.proxy }/api/categories/categoryInfo/${ res.item.categoryId }`)
                    .then(res => res.json())
                    .then(res => {
                        this.setState({
                            ...this.state,
                            category: res.category
                        })
                    })
            })
        
        fetch(`${ this.context.proxy }/api/items/itemImage/${ itemId }`)
            .then(res => res.blob())
            .then(res => {
                let reader = new FileReader();
                reader.readAsDataURL(res); 

                let imageData = '';

                const update = () => {
                    this.setState({
                        ...this.state,
                        imageData
                    })
                }

                reader.onloadend = function() {
                    let base64data = reader.result;   
                    imageData = base64data;
                    update()
                }
            })
        
        this.setState({
            ...this.state,
            itemId
        })
    }

        

    render() {
        const { isLoading, item, imageData, category } = this.state;

        if (isLoading) return (
            <h1>Loading...</h1>
        )

        return (
            <div className="medium-container">
                <BackLink />
                <div className="item-info-container">
                    <div className="item-info">
                        <div className="item-image">
                            <div className="img">
                                <img src={ imageData } alt=""/>
                            </div>
                            <div className="shopping-cart">
                                <h4 className="item-price">
                                    Price: { item.price }
                                </h4>
                                <p>
                                    Maximum quantity: { item.quantity }
                                </p>
                                <p>
                                    <AddToShoppingCartBtn
                                        showText={ true }
                                        itemId={ item._id }
                                    />
                                </p>
                            </div>
                        </div>
                        <div className="item-description">
                            <div className="desc-block">
                                <h3>{ item.title }</h3>
                            </div>
                            <div className="desc-block">
                                <span className="bold">Article: </span>
                                <span className="text">{ item.article || 'no article' }</span>
                            </div>
                            <div className="desc-block">
                                <span className="bold">Category: </span>
                                <span className="text">{ category ? <LinkToCategory category={ category } /> : 'loading...' }</span>
                            </div> 
                            <div className="desc-block">
                                <span className="bold">Description: </span>
                                <span className="text">{ item.description }</span>
                            </div> 
                            <div className="desc-block">
                                <span className="bold">Company: </span>
                                <span className="text">{ item.company }</span>
                            </div>
                            <div className="desc-block">
                                <span className="bold">Total orders: </span>
                                <span className="text">{ item.customers.length }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
