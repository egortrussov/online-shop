import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import AddToShoppingCart from './AddToShoppingCart/AddToShoppingCart';
import AddToShoppingCartBtn from '../Items/AddToShoppingCartBtn';

import './css/ItemInfo.css'

export default class ItemInfo extends Component {

    state = {
        isLoading: true,
        item: null,
        imageData: null
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
        const { isLoading, item, imageData } = this.state;

        if (isLoading) return (
            <h1>Loading...</h1>
        )

        return (
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
                            <h3 className="bold">{ item.title }</h3>
                        </div>
                        <div className="desc-block">
                            <span className="bold">Article: </span>
                            { item.article || 'no article' }
                        </div>
                        <div className="desc-block">
                            <span className="bold">Description: </span>
                            { item.description }
                        </div> 
                        <div className="desc-block">
                            <span className="bold">Company: </span>
                            { item.company }
                        </div>
                        <div className="desc-block">
                            <span className="bold">Total orders: </span>
                            { item.customers.length }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
