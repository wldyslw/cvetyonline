import React from 'react'
import ReactDOM from 'react-dom'

export default class CatalogPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="catalog-page">
                <figure className="catalog-page__fig">
                    <img src={this.props.describer.imgPath} className="catalog-page__img"></img>
                </figure>
                <div className="catalog-page__details">
                    <h3 className="catalog-page__price">Цена: {this.props.describer.price} BYN</h3>
                    <p className="catalog-page__description">{this.props.describer.description}</p>
                    <button className="catalog-page__buy">Добавить в корзину</button>
                </div>
            </div>
        );
    }
};
