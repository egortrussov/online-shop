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
                let { order } = res;

                if (!order.adress) {
                    if (order.userId === this.context.user._id) {
                        order.adress = this.context.user.adress;
                        console.log(this.context.user.adress)
                        this.setState({
                            isLoading: false,
                            order: {
                                ...order,
                                adress: this.context.user.adress
                            }
                        })
                    } else {
                        
                        fetch(`${ this.context.proxy }/api/users/userInfo/${ order.userId }`, {
                            method: 'GET',
                            headers: {
                                'x-auth-token': this.context.token
                            }
                        })
                            .then(res => res.json())
                            .then(res => {
                                order.adress = res.user.adress;
                                console.log(order.adress)
                                this.setState({
                                    isLoading: false,
                                    order
                                })
                            })
                    }
                } else {
                    this.setState({
                        isLoading: false,
                        order
                    })
                }
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
                <div className="order-cred">
                    <span className="bold">
                        Adress:
                    </span>
                    { order.adress }
                </div>
                <OrderItemsContainer 
                    items={ order.items }
                    authContext={ this.context }
                />
            </div>
        )
    }
}
