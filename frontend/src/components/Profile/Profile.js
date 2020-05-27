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
                        <span className="bold">Username: </span>
                        { user.username || user.companyInfo.name }
                    </div>
                    <div className="profile-card-block">
                        <span className="bold">E-mail: </span>
                        { user.email }
                    </div>
                    <div className="profile-card-block">
                        <span className="bold">Telephone: </span>
                        { user.telephone }
                    </div>
                    <div className="profile-card-block">
                        <span className="bold">Orders number: </span>
                        { user.orders.length }
                    </div>
                    <div className="profile-card-block">
                        <span className="bold">Is company: </span>
                        { user.isCompany ? 'yes' : 'no' }
                    </div>
                    {
                        user.isCompany && (
                            <>
                                <div className="profile-card-block">
                                    <span className="bold">BIN: </span>
                                    { user.companyInfo.bin }
                                </div>
                                <div className="profile-card-block">
                                    <span className="bold">Adress: </span>
                                    { user.companyInfo.adress }
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
