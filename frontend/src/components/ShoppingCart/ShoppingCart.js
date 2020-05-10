import React, { useContext, useState } from 'react'

import { ShoppingCartContext } from '../../contexts/ShoppingCartContext'
import { AuthContext } from '../../contexts/AuthContext';
import { Redirect } from 'react-router';
import ShoppingCartContainer from './ShoppingCartContainer/ShoppingCartContainer';

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

    // let hasResponceBeenSent = false;

    // if (!hasResponceBeenSent) {
    //     hasResponceBeenSent = true;
    //     fetch(`${ authContext.proxy }/api/items/shoppingCartItems`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'x-auth-token': authContext.token
    //         },
    //         body: JSON.stringify(items)
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             console.log(res)
    //             if (res.isTokenError) {
    //                 authContext.logout();
    //                 window.location.href = '/login';
    //                 return;
    //             }
    //             setItems(res.items)
    //         })
    // }

    
    // if (!itemInfos) return (
    //     <h1>Loading...</h1>
    // )

    return (
        <div>
            {
                <ShoppingCartContainer 
                    authContext={ authContext }
                    cartContext={ cartContext }
                 />
            }
        </div>
    )
}

export default ShoppingCart