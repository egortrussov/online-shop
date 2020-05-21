import React, { Component } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom';

export default class AllOrders extends Component {

    state = {
        isLoading: true,
        orders: null
    }

    static contextType = AuthContext;

    componentDidMount() {

        fetch(`${ this.context.proxy }/api/orders/allOrdersByUsers`, {
            headers: {
                'x-auth-token': this.context.token
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.isTokenError) {
                    this.context.logout();
                    window.location.href = "/login";
                }
                if (res.isAccessError) {
                    window.location.href = '/';
                }
                this.setState({
                    isLoading: false,
                    orders: res.orders
                })
            })
    }
    

    render() {
        const { isLoading, orders } = this.state;

        if (isLoading) return (
            <h1>Loading...</h1>
        )

        return (
            <div>
                {
                    orders.map(order => (
                        <Link to={ `/order/${ order._id }` }>
                            { order.date }
                        </Link>
                    ))
                }
            </div>
        )
    }
}
