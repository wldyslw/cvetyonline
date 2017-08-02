import React from 'react'
import {
    Grid,
    Col,
    Row,
    Media,
    PageHeader
} from 'react-bootstrap'
import {  } from 'react-router-dom'

class Delivery extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid className='grid'>
                <PageHeader className="pageheader">Доставка и оплата</PageHeader>
            </Grid>
        );
    }
}

export default Delivery;
