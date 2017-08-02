import React from 'react'
import {
    Grid,
    Col,
    Row,
    Media,
    PageHeader
} from 'react-bootstrap'
import {  } from 'react-router-dom'

class Contacts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid className='grid'>
                <PageHeader className="pageheader">Контакты</PageHeader>
            </Grid>
        );
    }
}

export default Contacts;
