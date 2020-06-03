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
            authContext
        })

        fetch(`${ authContext.proxy }/api/items/shoppingCartItems`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': authContext.token
            },
            body: JSON.stringify(items)
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

                const itemInfos = res.items;

                itemInfos.forEach(item => {
                    let currItemQty = 1;
                    items.forEach(currItem => {
                        if (currItem.itemId === item._id) 
                            currItemQty = currItem.quantity;
                    })
                    totalPrice += item.price * currItemQty;
                })

                this.setState({
                    ...this.state,
                    itemInfos,
                    totalPrice,
                    isLoading: false
                })
            })
    }

    render() {
        const { isLoading, itemInfos, currentItemQtys, totalPrice, isSubmitted } = this.state;
        const { items } = this.props;

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
                        <div className="cell total-price">
                            Total price
                        </div>
                    </div>
                    {
                        itemInfos.map(item => {

                            let currItemQty = 1;
                            items.forEach(currItem => {
                                if (currItem.itemId === item._id) 
                                    currItemQty = currItem.quantity;
                            })

                            return (
                                <div className="grid-line">
                                    <div className="cell name">
                                        <Link to={ `/item/${ item._id}` }>
                                            { item.title }
                                        </Link>
                                    </div>
                                    <div className="cell article">
                                        { item.article || '-' }
                                    </div>
                                    <div className="cell price">
                                        { item.price }
                                    </div>
                                    <div className="cell quantity">
                                        { currItemQty }
                                    </div> 
                                    <div className="cell total-price">
                                        { currItemQty * item.price }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
