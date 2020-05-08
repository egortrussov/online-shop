import React, { Component } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom';

export default class Profile extends Component {

    state = {

    }

    static contextType = AuthContext;

    render() {
        return (
            <h1>
                Hi, { this.context.user.username } 
                <Link to="/shoppingCart">
                    Cart
                </Link>
            </h1>
        )
    }
}
