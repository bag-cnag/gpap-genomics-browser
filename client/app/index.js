


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import allReducers from './src/reducers'
import {createStore} from "redux";
import { Provider } from "react-redux";
import WebFont from 'webfontloader';


WebFont.load({
    google: {
        families: ['Roboto:300,400,700', 'sans-serif']
    }
});


const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



store.subscribe(() => console.log(store.getState()));




ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('root'));