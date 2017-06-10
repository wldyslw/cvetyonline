import React from 'react'
import ReactDOM from 'react-dom'

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        // this.props == { cardsDescriber, gridType, viewCallback, addToCartCallback }
    }
    render() {
        return (
            <div className="card-wrapper">
                { this.props.cardsDescriber.filter(e => e.category == this.props.category).map((e, i) => {
                    return (
                        <div key={e.id} className="card">
                            <figure className="card__thumbnail">
                                <div className="card__shadow">
                                    <button onClick={this.props.viewCallback(e.id)} className="card__btn-view_in-shadow"></button>
                                </div>
                                <img src={e.imgPath} className="card__img"/>
                            </figure>
                            <div className="card__caption">
                                <h2 className="card__header">{ e.name }</h2>
                                <p className="card__description">{e.description}</p>
                                {this.props.gridType != 'featured' ? <button onClick={this.props.addCallback(e.id)} className="card__btn-view">В корзину</button> : ''}
                            </div>
                        </div>
                    );
                }) }
            </div>
        );
    }
};
