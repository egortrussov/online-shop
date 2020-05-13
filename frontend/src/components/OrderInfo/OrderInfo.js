import React, { Component } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

export default class OrderInfo extends Component {

    state = {
        isLoading: true,
        order: null
    }

    static contextType = AuthContext;

    // componentDidMount() {
    //     fetch(`${ this.context.proxy }/api/`)
    // }
    

    render() {
        const { isLoading, order } = this.state;

        if (isLoading) return (
            <h1>Loading...</h1>
        )

        return (
            <div>
                Order info
            </div>
        )
    }
}
