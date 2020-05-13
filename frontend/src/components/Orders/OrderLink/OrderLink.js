import React, { Component } from 'react'
import { Redirect } from 'react-router'

import { OrdersContext } from '../../../contexts/OrdersContext'

export default class OrderLink extends Component {
    state = {
        isRedirectToOrderPage: false
    }

    static contextType = OrdersContext;

    goToOrderPage() {
        this.context.setCurrentOrder(this.props.order)
        this.setState({
            isRedirectToOrderPage: true
        })
    }

    render() {
        const { isRedirectToOrderPage } = this.state;
        const { order } = this.props;

        if (isRedirectToOrderPage) return (
            <Redirect to={ `/profile/orders/${ order._id }` } />
        )

        return (
            <a onClick={ () => this.goToOrderPage() }>
                price: { order.totalPrice }
            </a>
        )
    }
}
