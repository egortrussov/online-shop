import React, { Component, createRef } from 'react'
import { Redirect } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import InputField from '../ReusableComponents/InputField/InputField';

import './css/Login.css'

export default class Login extends Component {

    state = {
        isRedirectToHomepage: false
    }

    constructor(props) {
        super(props);
        
        this.formRef = createRef()
    }

    static contextType = AuthContext;

    componentDidMount() {
        if (this.context.token) 
            this.setState({
                ...this.state,
                isRedirectToHomepage: true
            })
    }
    

    handleSubmit(e) {
        e.preventDefault()
        let formData = new FormData(this.formRef.current);
        
        const request = {
            email: formData.get('email'),
            password: formData.get('password')
        }
        
        fetch(`${ this.context.proxy }/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (!res.success)
                    return;
                this.context.login(res.token, res.user);
                window.location.href = '/'
            })
    }

    render() {
        const { isRedirectToHomepage } = this.state;

        if (this.context.token) return (
            <Redirect to="/" />
        )

        if (isRedirectToHomepage) return (
            <Redirect to='/' />
        )

        return (
            <div className="small-container">
                <form onSubmit={ (e) => this.handleSubmit(e) } ref={ this.formRef } action="">
                    <InputField type="text" label="E-mail" name="email" />
                    <InputField type="password" label="Password" name="password" />
                    <button type="submit" className="btn btn-cta lg">Login</button>
                </form>
            </div>
        )
    }
}
