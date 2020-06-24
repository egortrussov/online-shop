import React, { Component, createRef } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

export default class ManageCategories extends Component {

    state = {
        isLoading: true,
        categories: []
    }

    constructor(props) {
        super(props);

        this.formEl = createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        fetch(`${ this.context.proxy }/api/categories/allCategories`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    isLoading: false,
                    categories: res.categories
                })
            })
    }

    addCategory(e) {
        e.preventDefault();

        let formEl = this.formEl.current;
        let formData = new FormData(formEl);
        
        let request = {
            name: formData.get('name'),
            description: ''
        }

        fetch(`${ this.context.proxy }/api/categories/createCategory`, {
            method: 'POST',
            headers: {
                'x-auth-token': this.context.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
            .then(res => res.json()) 
            .then(res => {
                if (res.success) {
                    let { categories } = this.state;

                    categories.push(res.category);

                    this.setState({
                        ...this.state,
                        categories
                    })
                }
            })
    }    

    deleteCategory() {

    }

    render() {
        const { isLoading, categories } = this.state;

        if (isLoading) return (
            <h1>Loading...</h1>
        )

        return (
            <div>
                {
                    categories.map((category, inx) => (
                        <div className="category-block">
                            <button onClick={ () => this.deleteCategory() }>delete</button>
                            <span>{ category.name } </span>
                        </div>
                    ))
                }
                <form ref={ this.formEl } onSubmit={ (e) => this.addCategory(e) } className="add-category">
                    <input type="text" name="name" />
                    <button>Add</button>
                </form>
            </div>
        )
    }
}
