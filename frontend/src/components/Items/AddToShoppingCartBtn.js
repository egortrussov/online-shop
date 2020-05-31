import React, { Component } from 'react'

import { ShoppingCartContext } from '../../contexts/ShoppingCartContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

export default class AddToShoppingCartBtn extends Component {

    state = {
        isActive: false
    }

    static contextType = ShoppingCartContext;

    componentDidMount() {
        const { items } = this.context;

        if (items.find(item => item.itemId === this.props.itemId))
            this.setState({
                isActive: true
            })
    }
    
    addToCart() {
        if (!this.state.isActive)
            this.context.addToShoppingCart(this.props.itemId);
        else 
            this.context.deleteItem(this.props.itemId)
        this.setState({
            ...this.state,
            isActive: !this.state.isActive
        })
    }

    render() {
        const { isActive } = this.state;

        return (
            <>
                <button onClick={ () => this.addToCart() } className={ isActive ? 'add-to-shopping-cart-btn active' : 'add-to-shopping-cart-btn' }>
                    <i>
                        <FontAwesomeIcon icon={ faCartPlus } />
                    </i>
                    {
                        this.props.showText && ( isActive ? 'Added to shopping cart' : 'Add to shopping cart')
                    }
                </button>
            </>
        )
    }
}
