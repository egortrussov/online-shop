import React, { Component, createContext } from 'react'
import ls from 'local-storage'

import { getProxy } from './ContextMiddleware'

export const AuthContext = createContext();

class AuthContextProvider extends Component {
    state = {
        token: null,
        userId: null,
        proxy: getProxy()
    }

    login(token, userId) {
        ls.set('token', token)
        ls.set('userId', userId)
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