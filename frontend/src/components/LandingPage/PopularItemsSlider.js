import React, { Component } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

export default class PopularItemsSlider extends Component {

    state = {
        items: []
    }
    
    componentWillRecieveProps() {
        let items = this.props.items
        console.log(this.props.items)

        this.setState({
            items: this.props.items
        }, () => {
            this.props.items.forEach(item => {
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

        console.log(items)

        return (
            <div>
                <div className="owl-carousel owl-theme">
                    {
                        items.map(item => (
                            <div className="item">
                                {
                                    item.imageData ? ( <img src={ item.imageData } alt=""/> ) : 'No img'
                                }
                                <div>{ item.title }</div>
                            </div>
                        ))
                    }
                    { this.props.items.length }
                </div>
            </div>
        )
    }
}
