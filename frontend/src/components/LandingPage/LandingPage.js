import React, { Component } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
 
import './css/LandingPage.css'
import PopularItemsSlider from './PopularItemsSlider';

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
                }, () => this.forceUpdate())
            })
    }
    

    render() {
        const { items } = this.state;

        console.log(items)

        return (
            <div>
                <PopularItemsSlider items={ items } />
            </div>
        )
    }
}
