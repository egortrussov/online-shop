import React, { Component } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
import AddToShoppingCart from './AddToShoppingCart/AddToShoppingCart';

export default class ItemInfo extends Component {

    state = {
        isLoading: true,
        item: null,
        imageData: null
    }

    static contextType = AuthContext;

    componentDidMount() {
        const itemId = this.props.match.params.itemId;

        fetch(`${ this.context.proxy }/api/items/itemInfo/${ itemId }`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    ...this.state,
                    item: res.item,
                    isLoading: false 
                })
            })
        
        fetch(`${ this.context.proxy }/api/items/itemImage/${ itemId }`)
            .then(res => res.blob())
            .then(res => {
                let reader = new FileReader();
                reader.readAsDataURL(res); 

                let imageData = '';

                const update = () => {
                    this.setState({
                        ...this.state,
                        imageData
                    })
                }

                reader.onloadend = function() {
                    let base64data = reader.result;   
                    imageData = base64data;
                    update()
                }
            })
        
        this.setState({
            ...this.state,
            itemId
        })
    }

        

    render() {
        const { isLoading, item, imageData } = this.state;

        if (isLoading) return (
            <h1>Loading...</h1>
        )

        return (
            <div>
                <h1>Item: { item.title }</h1>
                {
                    imageData && (
                        <img src={ imageData } width="200" height="200" alt="" />
                    )
                }
                <AddToShoppingCart 
                    itemId={ item._id }
                />
            </div>
        )
    }
}
