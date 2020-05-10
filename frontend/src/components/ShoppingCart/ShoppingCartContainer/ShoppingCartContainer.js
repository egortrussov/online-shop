import React, { Component } from 'react'

export default class ShoppingCartContainer extends Component {

    state = {
        itemInfos: null,
        isLoading: true
    }

    componentDidMount() {
        const { authContext, cartContext } = this.props;
        console.log(cartContext)

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
    

    render() {
        const { isLoading, itemInfos } = this.state;

        if (isLoading) return (
            <h1>Loading...</h1>
        )

        return (
            <div>
                {
                    itemInfos.map(item => {
                        return (
                            <div>
                                { item.title }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
