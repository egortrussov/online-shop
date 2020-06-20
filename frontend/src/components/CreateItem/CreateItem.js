import React, { Component } from 'react'
import { createRef } from 'react';

import { Link } from 'react-router-dom'

import InputField from '../ReusableComponents/InputField/InputField';

import { AuthContext } from '../../contexts/AuthContext'
import ChooseCategory from './ChooseCategory';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'

import './css/CreateItem.css'

const newItem = {
    title: '',
    description: '',
    quantity: 0,
    price: null,
    company: '',
    article: ''
}

export default class CreateItem extends Component {

    state = {
        categories: null,
        currentCategory: null,
        isLoading: true,
        items: []
    }

    constructor(props) {
        super(props);

        this.formRef = createRef();
    }

    static contextType = AuthContext;
    
    setCurrentCategory(category) {
        this.setState({
            ...this.state,
            currentCategory: category
        })
    }

    createItem(e) {
        e.preventDefault()

        const { currentCategory } = this.state;
        
        let formEl = this.formRef.current;

        let formData = new FormData(formEl);

        formData.append('categoryId', currentCategory._id);

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

    addItem() {
        let { items } = this.state;
        items.push(newItem);
        this.setState({
            ...this.state,
            items
        })
    } 

    changeItemInfo(e, inx, type) {
        let { items } = this.state;

        let newVal = e.target.value;
        if (type === 'quantity' || type === 'price') 
            newVal = +newVal;

        items[inx] = {
            ...items[inx],
            [type]: newVal
        }

        this.setState({
            ...this.state,
            items
        })
    }

    render() {
        const { isLoading, currentCategory, items } = this.state;

        return (
            <div>
                <ChooseCategory setCurrentCategory={ (category) => this.setCurrentCategory(category) } />
                <div className="cart-grid create-item">
                    <div className="grid-line head">
                        <div className="cell name">
                            Item name
                        </div>
                        <div className="cell description">
                            Item description
                        </div>
                        <div className="cell article">
                            Article
                        </div>
                        <div className="cell price">
                            Price
                        </div>
                        <div className="cell quantity">
                            Quantity
                        </div>
                        <div className="cell company">
                            Company
                        </div>
                    </div>
                    {
                        items.map((item, inx) => {

                            return (
                                <div className="grid-line">
                                    <div className="cell name">
                                        <button onClick={ () => this.deleteItem(item._id) } className="delete-item">
                                            <FontAwesomeIcon className="icon" icon={ faTimes } />
                                        </button> 
                                        <input onChange={ (e) => this.changeItemInfo(e, inx, 'title') } type="text" value={ item.title } />
                                    </div>
                                    <div className="cell description">
                                        <input onChange={ (e) => this.changeItemInfo(e, inx, 'description') } type="text" value={ item.description } />
                                    </div>
                                    <div className="cell article">
                                        <input onChange={ (e) => this.changeItemInfo(e, inx, 'article') } type="text" value={ item.article } />
                                    </div>
                                    <div className="cell price">
                                        <input onChange={ (e) => this.changeItemInfo(e, inx, 'price') } type="text" value={ item.price } />
                                    </div>
                                    <div className="cell max-quantity">
                                        <input onChange={ (e) => this.changeItemInfo(e, inx, 'quantity') } type="text" value={ item.quantity } />
                                    </div>
                                    <div className="cell company">
                                        <input onChange={ (e) => this.changeItemInfo(e, inx, 'company') } type="text" value={ item.company } />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={ () => this.addItem() } className="btn"> <FontAwesomeIcon icon={ faPlus } /> Add item</button>
                
                {/* <form ref={ this.formRef } onSubmit={ (e) => this.createItem(e) }>                   
                    <InputField name="title" label="title" type="text" />
                    <InputField name="description" label="description" type="textarea" />
                    <InputField name="quantity" label="quantity" type="text" />
                    <InputField name="price" label="price" type="text" />
                    <InputField name="company" label="company" type="text" />
                    <InputField name="article" label="article" type="text" />
                    <input type="file" name="photo" accept="image/*" />
                    <input type="submit" value="Create!" />
                </form> */}
            </div>
        )
    }
}
