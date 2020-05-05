import React, { Component, createContext } from 'react'
import ls from 'local-storage'

import { getProxy } from './ContextMiddleware'

export const AuthContext = createContext();

class AuthContextProvider extends Component {
    state = {
        token: ls.get('token'),
        user: ls.get('user'),
        proxy: getProxy()
    }

    login(token, user) {
        ls.set('token', token)
        ls.set('user', user)
        this.token = token;
        this.user = user
    }

    logout() {
        ls.set('token', null)
        ls.set('user', null)
        this.token = null;
        this.user = null
    }

    render() {

        return (
            <AuthContext.Provider value={ {
                ...this.state,
                login: this.login,
                logout: this.logout
            } }>
                { this.props.children }
            </AuthContext.Provider>
        )
    }
}

export default AuthContextProvider