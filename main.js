import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import getStore from './src/store';
import App from './src';

const store = getStore();

ReactDOM.render( <Provider store={store}>
<App /></Provider>, document.querySelector('#content'));