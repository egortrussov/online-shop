import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Provider } from 'react-redux';
import store from './store/index'
import Items from './components/Items';

// contexts

import ItemContextProvider from './contexts/ItemContext' 

function App() {
  return (
    <ItemContextProvider>
      <Items />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ItemContextProvider>
  );
}

export default App;
