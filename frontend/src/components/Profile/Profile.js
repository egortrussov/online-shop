import React, { Component } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom';

import './css/Profile.css'

export default class Profile extends Component {

    state = {

    }

    static contextType = AuthContext;

    render() {
        const { user } = this.context;

        return (
            <div className="small-container">
                <div className="profile-info">
                    <h2>Profile card</h2>
                    <div className="profile-card-block">
                        <div className="bold">Username: </div>
                        { user.username || user.companyInfo.name }
                    </div>
                    <div className="profile-card-block">
                        <div className="bold">E-mail: </div>
                        { user.email }
                    </div>
                    <div className="profile-card-block">
                        <div className="bold">Telephone: </div>
                        { user.telephone }
                    </div>
                    <div className="profile-card-block">
                        <div className="bold">Orders number: </div>
                        { user.orders.length }
                    </div>
                    <div className="profile-card-block">
                        <div className="bold">Is company: </div>
                        { user.isCompany ? 'yes' : 'no' }
                    </div>
                    <div className="profile-card-block">
                        <div className="bold">Adress: </div>
                        { user.adress || user.companyInfo.adress }
                    </div>
                    {
                        user.isCompany && (
                            <>
                                <div className="profile-card-block">
                                    <div className="bold">BIN: </div>
                                    { user.companyInfo.bin }
                                </div>
                            </>
                        )
                    }
                </div>
                <Link to="/profile/orders" className="orders-link">
                    View orders
                </Link>
            </div>
        )
    }
}
