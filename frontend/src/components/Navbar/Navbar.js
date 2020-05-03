import React, { Component } from 'react'
import ls from 'local-storage'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'

export default class Navbar extends Component {

    state = {
        isLoggedIn: false
    }

    static contextType = AuthContext;

    componentDidMount() {
        const { token, user } = this.context;
        if (!token || !user)
            return;
        this.setState({
            ...this.state,
            isLoggedIn: true
        })
    }
    

    render() {
        const { isLoggedIn } = this.state;

        return (
            <div>
                {
                    isLoggedIn ? (
                        <>
                            Hello!
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                Login
                            </Link>
                            <Link to="/register">
                                Register
                            </Link>
                        </>
                    )
                }
            </div>
        )
    }
}
