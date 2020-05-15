import React, { Component } from 'react'
import { createRef } from 'react';
import InputField from '../ReusableComponents/InputField/InputField';

import { AuthContext } from '../../contexts/AuthContext'

export default class CreateItem extends Component {

    state = {

    }

    constructor(props) {
        super(props);

        this.formRef = createRef();
    }

    static contextType = AuthContext;

    createItem(e) {
        e.preventDefault()
        
        let formEl = this.formRef.current;

        let formData = new FormData(formEl);

        fetch(`${ this.context.proxy }/api/items/createItem`, {
            method: 'POST',
            headers: {
                'x-auth-token': this.context.token
            },
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
    }

    render() {
        return (
            <div>
                <form ref={ this.formRef } onSubmit={ (e) => this.createItem(e) }>
                    <InputField name="title" label="title" type="text" />
                    <InputField name="description" label="description" type="textarea" />
                    <InputField name="quantity" label="quantity" type="text" />
                    <InputField name="price" label="price" type="text" />
                    <InputField name="company" label="company" type="text" />
                    <input type="file" name="photo" accept="image/*" />
                    <input type="submit" value="Create!" />
                </form>
            </div>
        )
    }
}
