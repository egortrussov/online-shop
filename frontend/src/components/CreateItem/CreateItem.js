import React, { Component } from 'react'
import { createRef } from 'react';
import InputField from '../ReusableComponents/InputField/InputField';

import { AuthContext } from '../../contexts/AuthContext'
import ChooseCategory from './ChooseCategory';

export default class CreateItem extends Component {

    state = {
        categories: null,
        currentCategory: null,
        isLoading: true
    }

    constructor(props) {
        super(props);

        this.formRef = createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        // fetch(`${ this.context.proxy }/api/categories/allCategories`)
        //     .then(res => res.json())
        //     .then(res => {
        //         this.setState({
        //             ...this.state,
        //             isLoading: false,
        //             categories: res.categories,
        //             currentCategory: res.categories[0]
        //         })
        //     })
    }
    
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

    render() {
        const { isLoading, currentCategory } = this.state;

        return (
            <div>
                <ChooseCategory setCurrentCategory={ (category) => this.setCurrentCategory(category) } />
                <form ref={ this.formRef } onSubmit={ (e) => this.createItem(e) }>                   
                    <InputField name="title" label="title" type="text" />
                    <InputField name="description" label="description" type="textarea" />
                    <InputField name="quantity" label="quantity" type="text" />
                    <InputField name="price" label="price" type="text" />
                    <InputField name="company" label="company" type="text" />
                    <InputField name="article" label="article" type="text" />
                    <input type="file" name="photo" accept="image/*" />
                    <input type="submit" value="Create!" />
                </form>
            </div>
        )
    }
}
