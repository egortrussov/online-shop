import React, { Component } from 'react'
import ls from 'local-storage'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext'

import './css/style.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

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
                    <Link to="/">
                        <img src="/images/logo.jpg" alt="" className="logo"/>
                    </Link>
                </div>
                {
                    isLoggedIn ? (
                        <>

                            <div className="nav-right">
                                {
                                    user.isAdmin && (
                                        <Link className="nav-link" to="/adminPage">
                                            Admin page
                                        </Link>
                                    )
                                }
                                <Link className="nav-link" to="/profile">
                                    <div className="icon">
                                        <FontAwesomeIcon icon={ faUser } />
                                    </div>
                                </Link> 
                                <Link className="nav-link" to="/shoppingCart">
                                    <div className="icon">
                                        <FontAwesomeIcon icon={ faShoppingCart } />
                                        <ShoppingCartContext.Consumer>
                                            {
                                                value => (
                                                    <div className="shopping-cart-amount">
                                                        { value.items ? value.items.length : 0 }
                                                    </div>
                                                )
                                            }
                                        </ShoppingCartContext.Consumer>
                                    </div>
                                </Link> 

                                <a className="nav-link" onClick={ () => this.logout() }>
                                    <div className="icon">
                                        <FontAwesomeIcon icon={ faSignOutAlt } />
                                    </div>
                                </a>
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
