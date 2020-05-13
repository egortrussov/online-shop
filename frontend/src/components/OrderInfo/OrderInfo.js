import React, { Component } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
import { OrdersContext } from '../../contexts/OrdersContext';

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
            <div>
                { order ? (
                    <h1>{ order.date }</h1>
                ) : (
                    <OrdersContext.Consumer>
                        { value => {
                            if (!value.currentOrder) {
                                this.getOrder()
                                return;
                            }
                            return (
                                <h2>value.currentOrder.date</h2>
                            )
                        } }
                </OrdersContext.Consumer>
                ) }
            </div>
        )
    }
}
