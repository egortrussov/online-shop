import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// contexts

import AuthContextProvider from './contexts/AuthContext'

// components

import Navbar from './components/Navbar/Navbar';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

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
                        </Switch>
                    </>
                </AuthContextProvider>
            </BrowserRouter>
        )
    }
}