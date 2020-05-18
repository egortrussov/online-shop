import React, { Component } from 'react'
import { createRef } from 'react';
import InputField from '../ReusableComponents/InputField/InputField';

import { AuthContext } from '../../contexts/AuthContext'

export default class CreateItem extends Component {

    state = {
        item: null,
        isLoading: true
    }

    constructor(props) {
        super(props);

        this.formRef = createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        const itemId = this.props.match.params.itemId;

        fetch(`${ this.context.proxy }/api/items/itemInfo/${ itemId }`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    ...this.state,
                    isLoading: false,
                    item: res.item
                })
            })
    }

    changeItemInfo(e, field) {
        let { item } = this.state;
        item = {
            ...item,
            [field]: e.target.value
        }

        this.setState({
            ...this.state,
            item
        })
    }

    updateItem(e) {
        e.preventDefault()

        const { item } = this.state;

        console.log(item)

        let request = {
            title: item.title,
            description: item.description,
            price: item.price,
            quantity: item.quantity,
            company: item.company,
            article: item.article
        }
        console.log(JSON.stringify(request))

        fetch(`${ this.context.proxy }/api/items/updateItem/${ item._id }`, {
            method: 'POST',
            headers: {
                'x-auth-token': this.context.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) 
                    window.location.href = `/items/${ item._id }`
            })
    }

    render() {
        const { isLoading, item } = this.state;

        if (isLoading) return (
            <h1>Loading...</h1>
        )
        
        return (
            <div>
                <form ref={ this.formRef } onSubmit={ (e) => this.updateItem(e) }>                   
                    <InputField onChange={ (e, field) => this.changeItemInfo(e, field) }  name="title" label="title" type="text" value={ item.title } />
                    <InputField onChange={ (e, field) => this.changeItemInfo(e, field) }  name="description" label="description" type="textarea" value={ item.description } />
                    <InputField onChange={ (e, field) => this.changeItemInfo(e, field) }  name="quantity" label="quantity" type="text" value={ item.quantity } />
                    <InputField onChange={ (e, field) => this.changeItemInfo(e, field) }  name="price" label="price" type="text" value={ item.price } />
                    <InputField onChange={ (e, field) => this.changeItemInfo(e, field) }  name="company" label="company" type="text" value={ item.company } />
                    <InputField  onChange={ (e, field) => this.changeItemInfo(e, field) } name="article" label="article" type="text" value={ item.article } />
                    <input type="submit" value="update" />
                </form>
            </div>
        )
    }
}
