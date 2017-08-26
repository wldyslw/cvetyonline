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
    };

    render() {
        return (
            <div className="thumbnail">
                <LinkContainer exact to={`/catalog/${this.props.describer.category + '/' + this.props.describer.id}`}>
                    <img onClick={this.props.onView} role='button' src={backend.hostname + this.props.describer.image_paths.medium} alt={this.props.describer.name} />
                </LinkContainer>                                        
                <div className='caption'>
                    <h3>{this.props.describer.name}</h3>                  
                    <p>{this.props.describer.description}</p>
                    <hr />
                    <Row className='thumbnail__options'>
                        <h4 className='pull-left'>{this.props.describer.price}</h4>
                        <Button onClick={this.props.onAdd} className='cart-btn pull-right' bsStyle="danger">
                            <Glyphicon glyph='shopping-cart' />
                            В корзину
                        </Button>
                    </Row>
                </div>
            </div>
        );
    };
}

export default TradingCard;
