import React from 'react';
import { Grid, Col, Row, Carousel, Thumbnail, Button, ButtonGroup, ButtonToolbar, PageHeader, Badge } from 'react-bootstrap'
import './style'
import '../../assets/images/example.jpg'
import '../../assets/images/example2.jpg'

export default () => (
    <Grid className='grid'>
        <PageHeader className="pageheader">Каталог<Badge className="cart-badge">23</Badge></PageHeader>
        <Row>
            {new Array(24).fill(1).map((e,i) => {
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
);
