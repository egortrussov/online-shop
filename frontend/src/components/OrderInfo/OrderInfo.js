import React, { Component } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
import { OrdersContext } from '../../contexts/OrdersContext'

import './css/OrderInfo.css'

import { formatDate } from '../../middleware/dateFormat'
import OrderItemsContainer from './OrderItemsContainer'

export default class OrderInfo extends Component {

    state = {
        isLoading: true,
        order: null
    }

    static contextType = AuthContext;

    getOrder() {
        const orderId = this.props.match.params.orderId;

        this.setState({
            ...this.state,
            isLoading: true
        })

        fetch(`${ this.context.proxy }/api/orders/getOrder/${ orderId }`, {
            headers: {
                'x-auth-token': this.context.token
            }
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    isLoading: false,
                    order: res.order
                })
            })
    }

    componentDidMount() {
        this.getOrder()
    }
    
    

    render() {
        const { isLoading, order } = this.state;
        console.log('object')

        if (isLoading) return (
            <h1>Loading...</h1>
        )

        return (
            <div className="order-info-container medium-container">
                <h1>Order info</h1>
                <div className="order-cred">
                    <span className="bold">
                        Order id: 
                    </span>
                    { order._id }
                </div>
                <div className="order-cred">
                    <span className="bold">
                        Order date: 
                    </span>
                    { formatDate(order.date) }
                </div>
                <div className="order-cred">
                    <span className="bold">
                        Total price:
                    </span>
                    { order.totalPrice }
                </div>
                <OrderItemsContainer 
                    items={ order.items }
                    authContext={ this.context }
                />
            </div>
        )
    }
}
