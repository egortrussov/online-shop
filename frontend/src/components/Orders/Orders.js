import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import { Redirect } from 'react-router';

export default class Orders extends Component {

    state = {
        isLoading: true,
        isRedirectToLogin: false,
        orders: null
    }

    static contextType = AuthContext;

    componentDidMount() {
        fetch(`${ this.context.proxy }/api/orders/allOrders/${ this.context.user._id }`, {
            headers: {
                'x-auth-token': this.context.token
            }
        }) 
            .then(res => res.json())
            .then(res => {
                if (res.isTokenError) {
                    this.context.logout();
                    window.location.href = '/login'
                }
                this.setState({
                    ...this.state,
                    isLoading: false,
                    orders: res.orders 
                })
            })
    }
    

    render() {
        const { isLoading, orders, isRedirectToLogin } = this.state;

        if (isLoading) return (
            <h1>Loading...</h1>
        )

        return (
            <div>
                {
                    orders.map(order => (
                        <Link to={ `/profile/orders/${ order._id }` }>
                            <h2>{ order.date }, total price: { order.totalPrice }</h2>
                        </Link>
                    ))
                }
            </div>
        )
    }
}
