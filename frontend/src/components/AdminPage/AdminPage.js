import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class AdminPage extends Component {
    render() {
        return (
            <div>
                <Link to="/adminPage/createItem">
                    Create item
                </Link>
                <Link to="/adminPage/allOrders">
                    All orders
                </Link>
                <Link to="/adminPage/manageCategories">
                    Manage categories
                </Link>
            </div>
        )
    }
}
