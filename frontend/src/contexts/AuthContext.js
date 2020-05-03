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
    }

    render() {

        return (
            <AuthContext.Provider value={ {
                ...this.state,
                login: this.login
            } }>
                { this.props.children }
            </AuthContext.Provider>
        )
    }
}

export default AuthContextProvider