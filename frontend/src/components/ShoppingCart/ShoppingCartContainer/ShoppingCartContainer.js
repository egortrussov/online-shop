import React, { Component } from 'react'

export default class ShoppingCartContainer extends Component {

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
                    window.location.href = `/profile/orders/${ res.order._id }`;
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
                                        { item.title }
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
                                </div>
                            )
                        })
                    }
                </div>
                <h3>Total price: { totalPrice }</h3>
                <button onClick={ () => this.createOrder() }>Order!</button>
                {
                    isSubmitted && <span>waiting...</span>
                }
            </div>
        )
    }
}
