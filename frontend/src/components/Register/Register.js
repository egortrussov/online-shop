import React, { Component, createRef } from 'react'

export default class Register extends Component {

    state = {
        isCompany: false,
        companyContacts: []
    }

    constructor(props) {
        super(props);

        this.formRef = createRef()
    }

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
        

    }

    render() {
        const { isCompany } = this.state;

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
