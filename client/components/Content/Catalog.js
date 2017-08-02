import React from 'react';
import { 
    Grid, 
    Col, 
    Row, 
    Carousel, 
    Thumbnail, 
    Button, 
    ButtonGroup, 
    ButtonToolbar, 
    PageHeader, 
    Badge,
    Glyphicon 
} from 'react-bootstrap'
import './style'
import '../../assets/images/example.jpg'
import '../../assets/images/example2.jpg'

class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart(id) {
        //console.log('added to cart')
        return (event) => {
            event.preventDefault();
        }
    }

    render() {
        return (
            <Grid className='grid'>
                <PageHeader className="pageheader">Каталог<Badge className="cart-badge">23</Badge></PageHeader>
                <Row>
                    {new Array(24).fill(1).map((e,i) => {
                        return (
                            <Col key={i} xs={12} sm={6} md={4} lg={3}>
                                <Thumbnail src='./img/example.jpg'>
                                    <h3>Тюльпаны</h3>
                                    
                                    <p>Lorem ipsum dolor sit amet</p>
                                    <hr />
                                    <Row className='thumbnail__options'>
                                        <h4 className='pull-left'>1.55 BYN</h4>
                                        <Button onClick={this.addToCart} className='cart-btn pull-right' bsStyle="danger">
                                            <Glyphicon glyph='shopping-cart' />
                                            В корзину
                                        </Button>
                                    </Row>
                                </Thumbnail>
                            </Col>
                        );
                    })}
                </Row>
            </Grid>
        );
    }
}

export default Catalog;
