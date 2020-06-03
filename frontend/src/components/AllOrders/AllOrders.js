import React, { Component } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
import { Link, Redirect } from 'react-router-dom'

import './css/AllOrders.css'

import { formatDate } from '../../middleware/dateFormat'

export default class AllOrders extends Component {

    state = {
        isLoading: true,
        orders: null,
        isRedirectToOrderPage: false,
        orderIdToRedirect: null
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
                res.orders.reverse()
                this.setState({
                    isLoading: false,
                    orders: res.orders
                })
            })
    }
    
    goToOrderPage(id) {
        this.setState({
            isRedirectToOrderPage: true,
            orderIdToRedirect: id
        })
    }

    render() {
        const { isLoading, orders, isRedirectToOrderPage, orderIdToRedirect } = this.state;

        if (isLoading) return (
            <h1>Loading...</h1>
        )

        if (isRedirectToOrderPage) return (
            <Redirect to={ `/order/${ orderIdToRedirect }` } />
        )

        return (
            <div className="orders-container">
                {
                    orders.map(order => (
                        <div className="order-link medium-container" onClick={ () => this.goToOrderPage(order._id) }>
                            <div className="price">
                                Price: 
                                <span className="bold">
                                    { order.totalPrice }
                                </span> <br/>
                                <span className="bold no-margin">
                                    { order.items.length } items
                                </span>
                            </div>
                            <div className="date">
                                { formatDate(order.date) }
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
