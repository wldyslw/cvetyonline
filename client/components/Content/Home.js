import React from 'react';
import { Grid, Col, Row, Carousel, Button, ButtonToolbar, ButtonGroup, Badge } from 'react-bootstrap';

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
    </Grid>
)
