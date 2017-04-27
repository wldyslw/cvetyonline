import './assets/style/basic';
import './assets/style/buttons';
import './assets/style/main';

import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from './components/header/navbar'
import Promo from './components/header/promo'
import Content from './components/content/content-wrapper'

const cat = ['Букеты', 'Цветы', 'Горшки', 'Наши работы', 'Букеты невесты','Подарки'];

class Page extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <Promo />
                <Content categories={cat}/>
            </div>          
        );
    }
}

ReactDOM.render(
        <Page />,
        document.getElementById('root')
    );
