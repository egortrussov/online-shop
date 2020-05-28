import React, { useContext, useState } from 'react'

import { ShoppingCartContext } from '../../contexts/ShoppingCartContext'
import { AuthContext } from '../../contexts/AuthContext';
import { Redirect } from 'react-router';
import ShoppingCartContainer from './ShoppingCartContainer/ShoppingCartContainer'

import './css/style.css'

const ShoppingCart = () => {

    const cartContext = useContext(ShoppingCartContext);
    const authContext = useContext(AuthContext);

    const [items, setItems] = useState(cartContext.items);
    const [itemInfos, setItemInfos] = useState(null);

    let isLoading = true;
    
    const deleteItem = (itemId) => {
        let newItems = cartContext.deleteItem(itemId);

        setItems(newItems)
    }

    if (!authContext.token) return (
        <Redirect to="/login" />
    )

    return (
        <>
            {
                <ShoppingCartContainer 
                    authContext={ authContext }
                    cartContext={ cartContext }
                 />
            }
        </>
    )
}

export default ShoppingCart