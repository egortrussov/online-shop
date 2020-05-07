import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

// contexts

import AuthContextProvider from './contexts/AuthContext'

// components

import Navbar from './components/Navbar/Navbar'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Items from './components/Items/Items'

export default class App extends Component {

    render() {
        
        return (
            <BrowserRouter>
                <AuthContextProvider>
                    <>
                        <Navbar />
                        <Switch>
                            {/* <Route exact path="/" component={ } />  */}
                            <Route path="/login" component={ Login } /> 
                            <Route path="/register" component={ Register } /> 
                            <Route path="/items" component={ Items } />
                        </Switch>
                        <Link to="/items">
                            items page
                        </Link>
                    </>
                </AuthContextProvider>
            </BrowserRouter>
        )
    }
}