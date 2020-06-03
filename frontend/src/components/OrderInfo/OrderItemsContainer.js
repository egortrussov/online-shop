import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default class OrderItemsContainer extends Component {

    state = {
        itemInfos: null,
        currentItemQtys: null,
        isLoading: true,
        authContext: null,
        cartContext: null,
        totalPrice: 0,
        isSubmitted: false
    }

    componentDidMount() {
        const { authContext, items } = this.props;

        this.setState({
            ...this.state,
            currentItemQtys: cartContext.items,
            authContext
        })

        fetch(`${ authContext.proxy }/api/items/shoppingCartItems`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': authContext.token
            },
            body: JSON.stringify(cartContext.items)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.isTokenError) {
                    authContext.logout();
                    window.location.href = '/login';
                    return;
                }

                let totalPrice = 0;

                cartContext.items.forEach(item => {
                    totalPrice += res.items.find(itemInfo => itemInfo._id === item.itemId).price * item.quantity;
                })

                this.setState({
                    ...this.state,
                    itemInfos: res.items,
                    totalPrice,
                    isLoading: false
                })
            })
    }

    render() {
        const { isLoading, itemInfos, currentItemQtys, totalPrice, isSubmitted } = this.state;

        if (isLoading) return (
            <h1>Loading...</h1>
        )

        return (
            <div className="medium-container">
                <div className="cart-grid">
                    <div className="grid-line head">
                        <div className="cell name">
                            Item name
                        </div>
                        <div className="cell article">
                            Article
                        </div>
                        <div className="cell price">
                            Price
                        </div>
                        <div className="cell quantity">
                            Quantity
                        </div>
                        <div className="cell max-quantity">
                            Max quantity
                        </div>
                        <div className="cell total-price">
                            Total price
                        </div>
                    </div>
                    {
                        itemInfos.map(item => {
                            let currItemQty = 1;
                            currentItemQtys.forEach(cartItem => {
                                if (cartItem.itemId === item._id) 
                                    currItemQty = cartItem.quantity;
                            })

                            return (
                                <div className="grid-line">
                                    <div className="cell name">
                                        <button onClick={ () => this.deleteItem(item._id) } className="delete-item">
                                            <FontAwesomeIcon className="icon" icon={ faTimes } />
                                        </button> 
                                        <Link to={ `/item/${ item._id}` }>
                                            { item.title }
                                        </Link>
                                    </div>
                                    <div className="cell article">
                                        { item.article }
                                    </div>
                                    <div className="cell price">
                                        { item.price }
                                    </div>
                                    <div className="cell quantity">
                                        <input type="text" onChange={ (e) => this.setItemQuantity(e, item._id) } value={ currItemQty } />
                                    </div> 
                                    <div className="cell max-quantity">
                                        { item.quantity }
                                    </div>
                                    <div className="cell total-price">
                                        { currItemQty * item.price }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <h3 className="price">Total price: { totalPrice }</h3>
                <button className="btn btn-cta lg" onClick={ () => this.createOrder() }>Order!</button>
                {
                    isSubmitted && <span>waiting...</span>
                }
            </div>
        )
    }
}
