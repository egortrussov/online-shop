import React, { Component } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
 
import './css/LandingPage.css'
import ItemsSlider from './ItemsSlider';

export default class LandingPage extends Component {

    state = {
        items: []
    }

    static contextType = AuthContext;

    componentDidMount() {
        fetch(`${ this.context.proxy }/api/items/allItems`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    ...this.state,
                    items: res.items
                });

                let { items } = res;

                res.items.forEach(item => {
                    fetch(`${ this.context.proxy }/api/items/itemImage/${ item._id }`)
                        .then(res => res.blob())
                        .then(res => {
                            let reader = new FileReader();
                            reader.readAsDataURL(res); 
    
                            const update = () => {
                                this.setState({
                                    ...this.state,
                                    items
                                })
                            }
    
                            reader.onloadend = function() {
                                let base64data = reader.result;      
                                for (let i = 0; i < items.length; i++) {
                                    let currItem = items[i];
                                    if (currItem._id === item._id) {
                                        items[i].imageData = base64data;
                                        update()
                                        break;
                                    }
                                }
                            }
                        })
                    })
            })
    }
    

    render() {
        const { items } = this.state;

        return (
            <div>
                <ItemsSlider items={ items } type="popular" />
                <ItemsSlider items={ items } type="new" />
            </div>
        )
    }
}
