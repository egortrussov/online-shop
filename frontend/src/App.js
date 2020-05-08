import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

// contexts

import AuthContextProvider from './contexts/AuthContext'
import ShoppingCartContextProvider from './contexts/ShoppingCartContext'

// components

import Navbar from './components/Navbar/Navbar'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Items from './components/Items/Items'
import ItemInfo from './components/ItemInfo/ItemInfo'
import Profile from './components/Profile/Profile'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'

export default class App extends Component {

    render() {
        
        return (
            <BrowserRouter>
                <AuthContextProvider>
                    <ShoppingCartContextProvider>
                        <>
                            <Navbar />
                            <Switch>
                                {/* <Route exact path="/" component={ } />  */}
                                <Route path="/login" component={ Login } /> 
                                <Route path="/register" component={ Register } /> 
                                <Route path="/items" component={ Items } />
                                <Route path="/item/:itemId" component={ ItemInfo } />
                                <Route path="/profile" component={ Profile } />
                                <Route path="/shoppingCart" component={ ShoppingCart } />
                            </Switch>
                            <Link to="/items">
                                items page
                            </Link>
                        </>
                    </ShoppingCartContextProvider>
                </AuthContextProvider>
            </BrowserRouter>
        )
    }
}