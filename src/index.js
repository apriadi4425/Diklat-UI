import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouteCustom from './Route'
import * as serviceWorker from './serviceWorker';
import {GlobalStateProvider} from './GlobalState';

ReactDOM.render(
    <GlobalStateProvider>
        <RouteCustom />
    </GlobalStateProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
