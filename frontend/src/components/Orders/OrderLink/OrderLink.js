import React, { Component } from 'react'
import { Redirect } from 'react-router'

import { OrdersContext } from '../../../contexts/OrdersContext'
import { formatDate } from '../../../middleware/dateFormat';

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
            <div className="order-link" onClick={ () => this.goToOrderPage() }>
                <div className="date">
                    { formatDate(order.date) }
                </div>
                <div className="price">
                    Price: <br/>
                    <div className="bold">
                        { order.totalPrice }
                    </div>
                </div>
            </div>
        )
    }
}
