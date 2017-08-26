import React from 'react'
import {
    Grid,
    Row,
    Button
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const NotFound = () => (
    <Grid className='grid'>
        <Row className='text-center'>
            <h1>4😔4</h1>
            <p>
                Запрашиваемая страница не найдена. <br />
                Возможно, она была удалена или перемещена.
            </p>
            <LinkContainer exact to='/'>
                <Button bsStyle='danger'>Вернуться на главную</Button>
            </LinkContainer>
        </Row>
    </Grid>
);

export default NotFound;
