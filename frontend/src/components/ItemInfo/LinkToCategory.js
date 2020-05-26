import React, { Component } from 'react'
import { Redirect } from 'react-router'

import { ItemContext } from '../../contexts/ItemContext'

export default class LinkToCategory extends Component {

    state = {
        isRedirect: false
    }

    static contextType = ItemContext;

    gotoCategory() {
        this.context.setCategory(this.props.category);

        this.setState({
            ...this.state,
            isRedirect: true
        })
    }

    render() {
        const { isRedirect } = this.state;

        if (isRedirect) return (
            <Redirect to={ '/items' } />
        )
 
        return (
            <span className="link" onClick={ () => this.gotoCategory() }>
                { this.props.category.name }
            </span>
        )
    }
}
