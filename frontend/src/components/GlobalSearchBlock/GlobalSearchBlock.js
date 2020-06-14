import React, { Component, createRef } from 'react'

import { ItemContext } from '../../contexts/ItemContext';

import './css/GlobalSearchBlock.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default class GlobalSearchBlock extends Component {

    state = {

    }

    constructor(props) {
        super(props);

        this.inputEl = createRef();
    }

    static contextType = ItemContext;

    search(e) {
        e.preventDefault();

        let text = this.inputEl.current.value;

        this.context.setCurrentSearchText(text);

        window.location.href = "/items";
    } 

    render() {
        return (
            <div className="search-bl">
                <Link to="/items" className="items-link">
                    Catalogue
                </Link>
                <form onSubmit={ e => this.search(e) }>
                    <input type="text" ref={ this.inputEl } />
                    <button>
                        <FontAwesomeIcon icon={ faSearch } className="icon" />
                    </button>
                </form>
            </div>
        )
    }
}
