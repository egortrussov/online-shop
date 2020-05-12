import React, { Component } from 'react'

export default class ShoppingCartContainer extends Component {

    state = {
        itemInfos: null,
        currentItemQtys: null,
        isLoading: true,
        authContext: null,
        cartContext: null,
        totalPrice: 0
    }

    componentDidMount() {
        const { authContext, cartContext } = this.props;

        this.setState({
            ...this.state,
            currentItemQtys: cartContext.items,
            cartContext,
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

    setItemQuantity(e, itemId) {
        let newQuantity = +e.target.value;

        let { cartContext, totalPrice, itemInfos } = this.state;

        let oldQuantity = cartContext.items.find(item => item.itemId === itemId).quantity

        let newItems = cartContext.changeItemQuantity(itemId, newQuantity);

        let itemInfo = itemInfos.find(itemInfo => itemInfo._id === itemId);

        totalPrice = totalPrice - oldQuantity * itemInfo.price + itemInfo.price * newQuantity;

        this.setState({
            ...this.state,
            currentItemQtys: newItems,
            totalPrice
        })
    }    

    createOrder() {
        const { cartContext, currentItemQtys, itemInfos, authContext } = this.state;
        
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
            userId: authContext.user.userId,
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
            })
    }

    render() {
        const { isLoading, itemInfos, currentItemQtys, totalPrice } = this.state;

        if (isLoading) return (
            <h1>Loading...</h1>
        )

        return (
            <div>
                {
                    itemInfos.map(item => {
                        let currItemQty = 1;
                        currentItemQtys.forEach(cartItem => {
                            if (cartItem.itemId === item._id) 
                                currItemQty = cartItem.quantity;
                        })

                        return (
                            <div>
                                { item.title } quantity: <input type="text" onChange={ (e) => this.setItemQuantity(e, item._id) } value={ currItemQty } /> / { item.quantity }
                                
                            </div>
                        )
                    })
                }
                <h3>Total price: { totalPrice }</h3>
                <button onClick={ () => this.createOrder() }>Order!</button>
            </div>
        )
    }
}
