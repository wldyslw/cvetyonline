import React from 'react'
import {
    Grid,
    Col,
    Row,
    Media,
    PageHeader,
    Badge
} from 'react-bootstrap'
import {  } from 'react-router-dom'

class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid className='grid'>
                <PageHeader className="pageheader">Корзина<Badge className="cart-badge">23</Badge></PageHeader>
            </Grid>
        );
    }
}

export default Cart;
