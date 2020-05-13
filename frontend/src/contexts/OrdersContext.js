import React, { Component, createContext } from 'react'

export const OrdersContext = createContext();

class OrdersContextProvider extends Component {
    state = {
        orders: null,
        currentOrder: null
    }

    setOrders(orders) {
        this.orders = orders
    }

    setCurrentOrder(order) {
        this.currentOrder = order
    }

    render() {

        return (
            <OrdersContext.Provider value={ {
                ...this.state,
                setOrders: this.setOrders,
                setCurrentOrder: this.setCurrentOrder
            } }>
                { this.props.children }
            </OrdersContext.Provider>
        )
    }
}

export default OrdersContextProvider