import React, { Component } from 'react'
import ls from 'local-storage'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {

    state = {
        isLoggedIn: ls.get('token') ? true : false
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
