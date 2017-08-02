import React from 'react';
import { 
    Grid, 
    Col, 
    Row, 
    Carousel, 
    Button, 
    ButtonToolbar, 
    ButtonGroup, 
    Badge,
    PageHeader ,
    Thumbnail
} from 'react-bootstrap';

export default () => (
    <Grid className='grid'>
        <Carousel>
            <Carousel.Item>
                <img src="./img/example.jpg"/>
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    <Button bsSize='large' bsStyle='danger'>Узнать больше</Button>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="./img/example2.jpg"/>
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="./img/example.jpg"/>
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        <Row>
            <PageHeader className="pageheader">Избранные товары<Badge className="cart-badge">6</Badge></PageHeader>
            {new Array(12).fill(1).map((e,i) => {
                return (
                    <Col key={i} xs={12} sm={6} md={4} lg={3}>
                        <Thumbnail src='./img/example.jpg'>
                            <h3 className="text-center">Тюльпаны</h3>
                            <p className="text-center">Lorem ipsum dolor sit amet.</p>
                            <div className="text-center">
                                <ButtonToolbar style={{display: 'inline-block'}}>
                                    <ButtonGroup>
                                        <Button  bsStyle="danger">В корзину</Button>
                                        <Button>Подробнее</Button>
                                    </ButtonGroup>
                                </ButtonToolbar>
                            </div>
                        </Thumbnail>
                    </Col>
                );
            })}
        </Row>
    </Grid>
)
