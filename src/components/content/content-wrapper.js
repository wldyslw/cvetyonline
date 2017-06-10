import React from 'react'
import ReactDOM from 'react-dom'

import '../../assets/img/promo2.jpeg'
import '../../assets/img/promo.jpeg'

import './content.styl';
import CardGrid from './card-grid'
import CatalogPage from './catalog-page'

export default class ContentWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.contentTypeHandler = this.contentTypeHandler.bind(this);
    }
    contentTypeHandler(contentType) {
        if(contentType == 'cardGrid')
        return (
            <CardGrid gridType={this.props.cardGridType} category={this.props.currentCategory} viewCallback={this.props.cardOnView} addCallback={this.props.cardOnAdd} cardsDescriber={this.props.cardsDescriber} />
        );
        else if(contentType == 'catalogPage')
        return (
            <CatalogPage describer={this.props.cardsDescriber[0]}/>
        );
    }
    render() {
        const promoClass = 'promo' + (this.props.currentCategory != 'Избранные товары' ? ' promo_collapsed' : '');
        return (
            <section className="container content-wrapper">
                <div id="promo" className={ promoClass }>
                    <img src="../img/promo2.jpeg" alt="" className="promo__img"/>
                    <div className="promo__shadow">
                        <div className="promo__description">
                            <h1 className="promo__header">Специальное предложение</h1>
                            <p className="promo__text">Суть специального предложения</p>
                            <button className="promo__learnmore-btn">Узнать больше</button>
                        </div>
                    </div>
                </div>
                <h1 id="categoryHeader" className="content-wrapper__header">{this.props.currentCategory}</h1>
                {this.contentTypeHandler(this.props.contentType)}
            </section>
        );
    }
};
