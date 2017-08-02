import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import configureStore from './configureStore'
import './style'

const store = configureStore();

ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
);
