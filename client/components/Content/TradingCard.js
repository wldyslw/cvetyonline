import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import {
    Row,
    Button,
    Glyphicon
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { backend } from '../../constants'
import '../../assets/images/missing.png'

class TradingCard extends React.Component {
    constructor(props) {
        super(props);
        this.parseDescription = this.parseDescription.bind(this);
        this.renderPrice = this.renderPrice.bind(this);
        this.renderCartButton = this.renderCartButton.bind(this);
        this.renderImage = this.renderImage.bind(this);
        this.parseHeader = this.parseHeader.bind(this);
    };

    parseDescription(description) {
        return description.length > 60
        ? `${description.slice(0, 59).trim()}...`
        : description
    }

    parseHeader(header) {
        return header.length > 15
        ? `${header.slice(0, 14).trim()}...`
        : header
    }

    renderPrice() {
        if(this.props.describer.price) return `${this.props.describer.price} BYN`
        else if(this.props.describer.unit_products && this.props.describer.unit_products.length > 0) {
            const priceArr = this.props.describer.unit_products.map(e => e.price);
            return `${Math.min(...priceArr)} — ${Math.max(...priceArr)} BYN`
        }
        else return 'Цену уточняйте';
    }

    renderImage() {
        const imagePath = this.props.describer.images.length !== 0 ? `${backend.hostname + this.props.describer.images[0].medium}` : '/img/missing.png'
        return <img onClick={this.props.onView} role='button' src={imagePath} alt={this.props.describer.name} />
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
                    { this.renderImage() }
                </LinkContainer>                                        
                <div className='caption'>
                    <NavLink title={this.props.describer.name} className='thumbnail__caption' exact to={`/catalog/${this.props.describer.category + '/' + this.props.describer.id}`}>
                        {this.parseHeader(this.props.describer.name)}
                    </NavLink>                                      
                    <p>{this.parseDescription(this.props.describer.description)}</p>
                    <hr />
                    <Row className='thumbnail__options'>
                        <h4 className='pull-left'>{this.renderPrice()}</h4>
                        {/* {this.renderCartButton()} */}
                    </Row>
                </div>
            </div>
        );
    };
}

export default TradingCard;
