import React, { Component, createRef } from 'react'
import { Redirect } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'

export default class Register extends Component {

    state = {
        isCompany: false,
        companyContacts: []
    }

    constructor(props) {
        super(props);

        this.formRef = createRef()
    }

    static contextType = AuthContext;

    setCompanyState() {
        this.setState({
            ...this.state,
            isCompany: !this.state.isCompany
        })
    }

    register(e) {
        e.preventDefault();

        let formEl = this.formRef.current;
        let formData = new FormData(formEl);

        const { isCompany } = this.state;

        let creds = {}
        if (!isCompany)
            creds = {
                email: formData.get('email'),
                username: formData.get('username'),
                password: formData.get('password'),
                isCompany
            }        
        else 
            creds = {
                email: formData.get('email'),
                isCompany,
                password: formData.get('password'),
                companyInfo: {
                    name: formData.get('companyName'),
                    adress: formData.get('companyAdress'),
                    bin: formData.get('companyBin'),
                    contacts: [{
                        contact: formData.get('contact'),
                        contactName: formData.get('contactName')
                    }]
                }
            }
        
        fetch(`${ this.context.proxy }/api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(creds)
        })
            .then(res => res.json())
            .then(res => {
                if (!res.success)
                    return;
                this.context.login(res.token, res.createdUser);
                window.location.href = '/'
            })
    }

    render() {
        const { isCompany } = this.state;

        if (this.context.token) return (
            <Redirect to='/' />
        )

        return (
            <div>
                <form onSubmit={ (e) => this.register(e) } ref={ this.formRef }>
                    <label htmlFor="">E-mail</label>
                    <input type="email" name="email"  /> <br/>
                    {
                        !isCompany && (
                            <>
                            <label htmlFor="">Telephone</label>
                            <input type="telephone" name="telephone" />
                            </>
                        )
                    }
                    {
                        !isCompany && (
                            <>
                                <label htmlFor="">Name</label>
                                <input type="text" name="username" />
                            </>
                        )
                    }
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" />

                    <label htmlFor="">is company</label>
                    <input type="checkbox" onChange={ () => this.setCompanyState() } />
                    {
                        isCompany && (
                            <>
                                <label htmlFor="">Company name</label>
                                <input type="text" name="companyName" />
                                <label htmlFor="">Company adress</label>
                                <input type="text" name="companyAdress" />
                                <label htmlFor="">Company BIN</label>
                                <input type="text" name="companyBin" />

                                <div>
                                    <label htmlFor="">Contact person name</label>
                                    <input type="text" name="contactName"  />
                                    <label htmlFor="">Contact</label>
                                    <input type="text" name="contact"  />
                                </div>
                            </>
                        )
                    }

                    <input type="submit" value="Register"/>
                </form>
            </div>
        )
    }
}
