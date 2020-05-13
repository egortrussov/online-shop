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
import Orders from './components/Orders/Orders'
import OrderInfo from './components/OrderInfo/OrderInfo'
import OrdersContextProvider from './contexts/OrdersContext'

export default class App extends Component {

    render() {
        
        return (
            <BrowserRouter>
                <AuthContextProvider>
                    <ShoppingCartContextProvider>
                        <OrdersContextProvider>
                            <>
                                <Navbar />
                                <Switch>
                                    {/* <Route exact path="/" component={ } />  */}
                                    <Route path="/login" component={ Login } /> 
                                    <Route path="/register" component={ Register } /> 
                                    <Route path="/items" component={ Items } />
                                    <Route path="/item/:itemId" component={ ItemInfo } />
                                    <Route exact path="/profile" component={ Profile } />
                                    <Route exact path="/profile/orders" component={ Orders } />
                                    <Route path="/profile/orders/:orderId" component={ OrderInfo } />
                                    <Route path="/shoppingCart" component={ ShoppingCart } />
                                </Switch>
                                <Link to="/items">
                                    items page
                                </Link>
                            </>
                        </OrdersContextProvider>
                    </ShoppingCartContextProvider>
                </AuthContextProvider>
            </BrowserRouter>
        )
    }
}