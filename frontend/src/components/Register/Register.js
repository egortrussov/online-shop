import React, { Component, createRef } from 'react'
import { Redirect } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import InputField from '../ReusableComponents/InputField/InputField'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import './css/Register.css'
import { validate } from '../../middleware/validator'

export default class Register extends Component {

    state = {
        isCompany: false,
        companyContacts: [],
        errors: []
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
        if (!isCompany) {
            creds = {
                email: formData.get('email'),
                username: formData.get('username'),
                password: formData.get('password'),
                adress: formData.get('adress'),
                telephone: formData.get('telephone'),
                isCompany
            }     
            let validateCreds = [
                { 'name': 'email', 'value':  formData.get('email') },
                { 'name': 'username', 'value':  formData.get('username') },
                { 'name': 'password', 'value':  formData.get('password') },
                { 'name': 'adress', 'value':  formData.get('adress') },
                { 'name': 'telephone', 'value':  formData.get('telephone') }
            ]   
            let errors = validate(validateCreds, false);

            if (errors.hasErrors) {
                this.setState({
                    ...this.state,
                    errors: errors.errors
                });
                console.log('error')
                return;
            }
        }
        else {
            creds = {
                email: formData.get('email'),
                isCompany,
                password: formData.get('password'),
                adress: formData.get('adress'),
                companyInfo: {
                    name: formData.get('companyName'),
                    bin: formData.get('companyBin'),
                    contacts: [{
                        contact: formData.get('contact'),
                        contactName: formData.get('contactName')
                    }]
                }
            }
            let validateCreds = [
                { 'name': 'email', 'value':  formData.get('email') },
                { 'name': 'adress', 'value':  formData.get('adress') },
                { 'name': 'password', 'value':  formData.get('password') },
                { 'name': 'companyName', 'value':  formData.get('companyName') },
                { 'name': 'bin', 'value':  formData.get('companyBIN') }
            ]   
            let errors = validate(validateCreds, true);

            if (errors.hasErrors) {
                this.setState({
                    ...this.state,
                    errors: errors.errors
                });
                return;
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
        const { isCompany, errors } = this.state;

        if (this.context.token) return (
            <Redirect to='/' />
        )

        return (
            <div className="small-container">
                <form onSubmit={ (e) => this.register(e) } ref={ this.formRef }>
                    <InputField type="text" label="E-mail" name="email"  errorMsg={ errors['email'] } />
                    {
                        !isCompany && (
                            <>
                                <InputField type="telephone" label="Telephone" name="telephone" errorMsg={ errors['telephone'] } />
                            </>
                        )
                    }
                    {
                        !isCompany && (
                            <>
                                <InputField type="text" label="Username" name="username" errorMsg={ errors['username'] } />  
                            </>
                        )
                    }
                    <InputField type="text" label="Adress" name="adress" errorMsg={ errors['adress'] } />
                    <InputField type="password" label="Password" name="password" errorMsg={ errors['password'] } />
                    {
                        isCompany && (
                            <>
                                <InputField type="text" label="Company name" name="companyName" errorMsg={ errors['companyName'] } />
                                
                                <InputField type="text" label="Company BIN" name="companyBIN" errorMsg={ errors['bin'] } />

                                <div>
                                    <InputField type="text" label="Contact" name="contact" errorMsg={ errors[''] } />
                                    
                                </div>
                            </>
                        )
                    }

                    <div className="input-group">
                        <div className="checkbox-group pretty p-icon p-smooth p-thick p-curve">
                            <input type="checkbox" onChange={ () => this.setCompanyState() } />
                            <div className="state p-warning">
                                <i className="icon">
                                    <FontAwesomeIcon className="check-icon" icon={ faCheck } />
                                </i>
                                <label>Is company</label>
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-cta lg">Register</button>
                </form>
            </div>
        )
    }
}
