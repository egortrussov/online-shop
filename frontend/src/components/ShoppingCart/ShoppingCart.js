import React, { useContext } from 'react'

import { ShoppingCartContext } from '../../contexts/ShoppingCartContext'
import { AuthContext } from '../../contexts/AuthContext';
import { Redirect } from 'react-router';

const ShoppingCart = () => {

    const cartContext = useContext(ShoppingCartContext);
    const authContext = useContext(AuthContext);
    
    if (!authContext.token) return (
        <Redirect to="/login" />
    )

    return (
        <div>
            {
                cartContext.items.map(item => (
                    <div>{ item.itemId }</div>
                ))
            }
        </div>
    )
}

export default ShoppingCart