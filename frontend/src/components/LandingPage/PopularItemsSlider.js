import React, { Component } from 'react'

import OwlCarousel from 'react-owl-carousel';

import { Helmet } from 'react-helmet'

import { AuthContext } from '../../contexts/AuthContext'

export default class PopularItemsSlider extends Component {

    state = {
        items: []
    }

    componentDidMount() {
        const script = document.createElement("script");

        script.src = "public_js/owl.config.js";
        script.async = true;

        document.body.appendChild(script);
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
        const { items } = this.props;

        return (
            <div>
                <OwlCarousel className="owl-theme" loop autoplay={ true } autoplayTimeout={ 2000 } autoplayHoverPause={ true } responsive={ {0:{ items:1}, 600:{ items:3 }, 1300:{ items:5 }} }>
                    {
                        items.map(item => (
                            <div className="item">
                                <img src={ item.imageData || '/images/no-image.png' } alt=""/>
                                <div>{ item.title }</div>
                            </div>
                        ))
                    }
                    { this.props.items.length }
                </OwlCarousel>

                <Helmet>
                    <script src="/public_js/owl.config.js"></script>
                </Helmet>
            </div>
        )
    }
}
