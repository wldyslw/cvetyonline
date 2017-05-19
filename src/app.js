import './assets/style/basic';
import './assets/style/buttons';
//import './assets/style/main';

import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header/header.js'
import Content from './components/content/content-wrapper.js'
import Footer from './components/footer/footer.js'

import '../dev/flowers.json'

const getFlowersGrid = (request, callback) => {
    fetch(request, {method: 'GET'})
    .then(response => {
        return response.json();
    })
    .then(json => {
        const flowersDescriber = [];
        json.forEach(e => {
            flowersDescriber.push({
                id: e.ID,
                name: e.Name,
                category: e.Category,
                description: e.Description,
                price: e.Price,
                inStock: e.InStock,
                imgPath: './img/promo2.jpeg'
            });
        });
        return flowersDescriber;
    })
    .then(flowersDescriber => {
        if(callback) callback(flowersDescriber);
    });
};

const Globals = {
    collapsed: false,
    contentType: 'cardGrid',
    currentCategory: 'Избранные товары',
    flowers: [],
    categories: [
        { header: 'Букеты', description: 'Описание, размер не ограничен'},
        { header: 'Цветы', description: 'Букет для самых любимых'},
        { header: 'Горшки', description: 'Букет для самых любимых'},
        { header: 'Наши работы', description: 'Букет для самых любимых'},
        { header: 'Букеты невесты', description: 'Букет для самых любимых'},
        { header: 'Подарки', description: 'Букет для самых любимых'}
    ]
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.onNavigate = this.onNavigate.bind(this);
        this.onView = this.onView.bind(this);
        this.state = Globals;
    }
    onNavigate(event) {
        event.preventDefault();
        this.setState({
            contentType: 'cardGrid',
            currentCategory: event.target.innerText == 'CvetyOnline' ? 'Избранные товары' : event.target.innerText,
            collapsed: event.target.innerText != 'CvetyOnline'
        });
    }
    onView(id) {
        return () => {
            this.setState({
                contentType: 'catalogPage',
                currentCategory: this.state.flowers.find(e => e.id == id).name,
                collapsed: true
            })
        }
    }
    componentWillMount() {
        getFlowersGrid('../flowers.json', response => {
            this.setState({
                flowers: response
            });
        });
    }
    render() {
        if(this.state.flowers.length > 0) return (
            <div>
                <Header 
                    collapsed={this.state.collapsed}
                    onNavigate={this.onNavigate}
                    categories={this.state.categories.map(e => {
                        return e.header;
                    })}
                />
                <Content
                    contentType={this.state.contentType}
                    currentCategory={this.state.currentCategory}
                    cardGridType='catalog'
                    cardOnView={this.onView}
                    cardsDescriber={this.state.flowers}
                />
                <Footer />
            </div>
        );
        return <h1>Loading...</h1>
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('root')
);
