import React, { Component } from 'react'
import { createRef } from 'react';

export default class CreateItem extends Component {

    state = {

    }

    constructor(props) {
        super(props);

        this.formRef = createRef();
    }

    render() {
        return (
            <div>
                <form ref={ this.formRef }>
                    <label htmlFor="">title</label>
                    <input type="text" name="title" />
                </form>
            </div>
        )
    }
}
