import './assets/style/basic';
import './assets/style/buttons';
import './assets/style/main';

import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header'

const ReactRoot = document.createElement("div");
ReactRoot.id = 'root';
document.body.insertBefore(ReactRoot, document.body.firstElementChild);

ReactDOM.render(
    <Header />,
    document.getElementById('root')
);