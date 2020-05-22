import React, { Component } from 'react'
import ls from 'local-storage'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'

import './css/style.css'

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
        window.location.href = '/login'
    }    

    render() {
        const { isLoggedIn } = this.state;
        const user = this.context.user;
        console.log(user)

        console.log(isLoggedIn)

        return (
            <nav>
                <div className="nav-left">
                    <img src="/images/logo.jpg" alt="" className="logo"/>
                </div>
                {
                    isLoggedIn ? (
                        <>

                            <div className="nav-right">
                                <Link className="nav-link" to="/profile">
                                    Profile
                                </Link>

                                <a className="nav-link" onClick={ () => this.logout() }>Logout</a>

                                {
                                    user.isAdmin && (
                                        <Link className="nav-link" to="/adminPage">
                                            Admin page
                                        </Link>
                                    )
                                }
                            </div>
                        </>
                    ) : (
                        <div className="nav-right">
                            <Link className="btn" to="/login">
                                Login
                            </Link>
                            <Link className="btn btn-cta" to="/register">
                                Register
                            </Link>
                        </div>
                    )
                }
            </nav>
        )
    }
}
