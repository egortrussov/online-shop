import React, { useContext, useState } from 'react'

import { ShoppingCartContext } from '../../contexts/ShoppingCartContext'
import { AuthContext } from '../../contexts/AuthContext';
import { Redirect } from 'react-router';

const ShoppingCart = () => {

    const cartContext = useContext(ShoppingCartContext);
    const authContext = useContext(AuthContext);

    const [items, setItems] = useState(cartContext.items);
    
    const deleteItem = (itemId) => {
        let newItems = cartContext.deleteItem(itemId);

        setItems(newItems)
    }

    if (!authContext.token) return (
        <Redirect to="/login" />
    )

    return (
        <div>
            {
                items.map(item => (
                    <div>{ item.itemId }
                        <button onClick={ () => deleteItem(item.itemId) }>x</button>
                    </div>
                ))
            }
        </div>
    )
}

export default ShoppingCart