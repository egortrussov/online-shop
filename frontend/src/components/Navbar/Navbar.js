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
        console.log(this.context)
        if (!token || !user)
            return;
        this.setState({
            ...this.state,
            isLoggedIn: true
        })
    }

    logout() {
        this.context.logout()
        this.setState({
            ...this.state,
            isLoggedIn: false
        })
    }    

    render() {
        const { isLoggedIn } = this.state;
        console.log(isLoggedIn)

        return (
            <div>
                {
                    isLoggedIn ? (
                        <>
                            Hello!

                            <button onClick={ () => this.logout() }>Logout</button>
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
