import React, { Component } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
import { OrdersContext } from '../../contexts/OrdersContext'

import './css/OrderInfo.css'

import { formatDate } from '../../middleware/dateFormat'

export default class OrderInfo extends Component {

    state = {
        isLoading: false,
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
    

    render() {
        const { isLoading, order } = this.state;

        if (isLoading) return (
            <h1>Loading...</h1>
        )

        return (
            <div className="order-info-container medium-container">
                { order ? (
                    <>
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
                    </>
                ) : (
                    <OrdersContext.Consumer>
                        { value => {
                            if (!value.currentOrder) {
                                this.getOrder()
                                return;
                            }
                            return (
                                <h2>{ value.currentOrder.date }</h2>
                            )
                        } }
                </OrdersContext.Consumer>
                ) }
            </div>
        )
    }
}
