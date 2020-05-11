import React, { Component } from 'react'

export default class ShoppingCartContainer extends Component {

    state = {
        itemInfos: null,
        currentItemQtys: null,
        isLoading: true,
        authContext: null,
        cartContext: null
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
                this.setState({
                    ...this.state,
                    itemInfos: res.items,
                    isLoading: false
                })
            })
    }

    setItemQuantity(e, itemId) {
        let newQuantity = +e.target.value;

        let { cartContext } = this.state;

        let newItems = cartContext.changeItemQuantity(itemId, newQuantity);

        this.setState({
            currentItemQtys: newItems
        })
    }    

    render() {
        const { isLoading, itemInfos, currentItemQtys } = this.state;

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
            </div>
        )
    }
}
