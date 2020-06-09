import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import InputField from '../../ReusableComponents/InputField/InputField';

export default class ShoppingCartContainer extends Component {

    state = {
        itemInfos: null,
        currentItemQtys: null,
        isLoading: true,
        authContext: null,
        cartContext: null,
        totalPrice: 0,
        isSubmitted: false,
        adress: null
    }

    componentDidMount() {
        const { authContext, cartContext } = this.props;

        let currentAdress = cartContext.adress || authContext.user.adress || authContext.user.companyInfo.adress;
        console.log(authContext.user)

        this.setState({
            ...this.state,
            currentItemQtys: cartContext.items,
            cartContext,
            authContext,
            adress: currentAdress
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

    setItemQuantity(e, itemId) {
        let newQuantity = +e.target.value;

        let { cartContext, totalPrice, itemInfos } = this.state;

        let itemInfo = itemInfos.find(itemInfo => itemInfo._id === itemId);

        let oldQuantity = cartContext.items.find(item => item.itemId === itemId).quantity;

        if (itemInfo.quantity < newQuantity) {
            return;
        }

        let newItems = cartContext.changeItemQuantity(itemId, newQuantity);

        totalPrice = totalPrice - oldQuantity * itemInfo.price + itemInfo.price * newQuantity;

        this.setState({
            ...this.state,
            currentItemQtys: newItems,
            totalPrice
        })
    }    

    deleteItem(itemId) {
        let { itemInfos, cartContext } = this.state;

        const newItems = cartContext.deleteItem(itemId);
        
        itemInfos = itemInfos.filter(itemInfo => itemInfo._id !== itemId);

        this.setState({
            ...this.state,
            itemInfos
        })
    }

    setAdress(e) {
        const { cartContext } = this.state;

        cartContext.setAdress(e.target.value);

        this.setState({
            ...this.state,
            adress: e.target.value
        })
    }

    createOrder() {
        const { cartContext, currentItemQtys, itemInfos, authContext, isSubmitted } = this.state;

        if (isSubmitted) 
            return;
        
        this.setState({
            ...this.state,
            isSubmitted: true
        })
        
        let nums = new Map();

        itemInfos.forEach(item => nums.set(item._id, {
            quantity: item.quantity,
            price: item.price
        }))

        let hasErrors = false;
        let totalPrice = 0

        currentItemQtys.forEach(item => {
            if (nums.get(item.itemId).quantity < item.quantity) {
                hasErrors = false;
                return;
            }
            totalPrice += nums.get(item.itemId).price * item.quantity;
        })


        if (hasErrors)
            return;
        
        let request = {
            userId: authContext.user._id,
            totalPrice,
            items: currentItemQtys
        }
        
        fetch(`${ authContext.proxy }/api/orders/newOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': authContext.token
            },
            body: JSON.stringify(request)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.success) {
                    cartContext.clearCart();
                    window.location.href = `/order/${ res.order._id }`;
                } else {
                    if (res.isTokenError) {
                        authContext.logout();
                        window.location.href = '/login';
                    }

                    const { itemQuantities } = res;

                    for (let item of itemInfos) {
                        item.quantity = itemQuantities.get(item._id);
                    }

                    this.setState({
                        ...this.state,
                        itemInfos
                    })
                }
            })
    }

    render() {
        const { isLoading, itemInfos, currentItemQtys, totalPrice, isSubmitted, items, adress } = this.state;

        if (isLoading) return (
            <h1>Loading...</h1>
        )

        if (!currentItemQtys.length) return (
            <h1 className="empty-cart-msg">
                Cart is empty!
            </h1>
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
                                        { item.article || '-' }
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
                <InputField label="Delivery adress: " onChange={ this.setAdress } value={ adress } type="text" name="adress" isMini={ true } />
                <h3 className="price">Total price: { totalPrice }</h3>
                <button className="btn btn-cta lg" onClick={ () => this.createOrder() }>Order!</button>
                {
                    isSubmitted && <span>waiting...</span>
                }
            </div>
        )
    }
}
