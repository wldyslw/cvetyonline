import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import {
    Row,
    Button,
    Glyphicon
} from 'react-bootstrap';
import { backend } from '../../constants'

class TradingCard extends React.Component {
    constructor(props) {
        super(props);
        this.parseDescription = this.parseDescription.bind(this);
        this.renderPrice = this.renderPrice.bind(this);
        this.renderCartButton = this.renderCartButton.bind(this);
    };

    parseDescription(description) {
        return description.length > 65
        ? `${description.slice(0, 59).trim()}...`
        : description
    }

    renderPrice() {
        if(this.props.describer.price) return `${this.props.describer.price} BYN`
        else if(this.props.describer.unit_products && this.props.describer.unit_products.length > 0) {
            const priceArr = this.props.describer.unit_products.map(e => e.price);
            return `${Math.min(...priceArr)} — ${Math.max(...priceArr)} BYN`
        }
        else return 'Цену уточняйте';
    }

    renderCartButton() {
        if(this.props.describer.price) return (
            <div>
                <Button onClick={this.props.onAdd} className='cart-btn pull-right' bsStyle="danger">
                    <Glyphicon glyph='shopping-cart' />
                    В корзину
                </Button>
            </div>
        );
    }

    render() {
        return (
            <div className="thumbnail">
                <LinkContainer exact to={`/catalog/${this.props.describer.category + '/' + this.props.describer.id}`}>
                    <img onClick={this.props.onView} role='button' src={backend.hostname + this.props.describer.image_paths.medium} alt={this.props.describer.name} />
                </LinkContainer>                                        
                <div className='caption'>
                    <h3>{this.props.describer.name}</h3>                  
                    <p>{this.parseDescription(this.props.describer.description)}</p>
                    <hr />
                    <Row className='thumbnail__options'>
                        <h4 className='pull-left'>{this.renderPrice()}</h4>
                        {this.renderCartButton()}
                    </Row>
                </div>
            </div>
        );
    };
}

export default TradingCard;
