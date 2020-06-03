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
            <Redirect to={ `/order/${ order._id }` } />
        )

        return (
            <div className="order-link medium-container" onClick={ () => this.goToOrderPage() }>
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
        )
    }
}
