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
                <PageHeader className="pageheader">Условия покупки</PageHeader>
                <p style={{ fontSize: 18, fontWeight: 300}}>
                    <strong>Cvetyonline</strong> является интернет витриной магазина по адресу 
                    <strong> г.Минск, ул. 50 лет Победы, 5а</strong> "В соответствии с постановлением 
                    Совета Министров Республики Беларусь от 8 сентября 2006 г. 
                    № 1161 «О некоторых вопросах осуществления розничной торговли 
                    по образцам с использованием сети Интернет".
                </p>
                <p style={{ fontSize: 24, fontWeight: 300 }}>
                    Вы можете приобрести продукцию в магазине, предварительно 
                    согласовав ее наличие по телефонам указанным на сайте с 
                    менеджером. Если вы хотите заказать товар с доставкой 
                    перейдите в наш интернет-магазин <a style={{ fontWeight: 'bold' }} href='http://booket.by'>booket.by</a> или 
                    позвоните по номеру <a style={{ fontWeight: 'bold' }} href="tel:+375291750880">+375-29-175-08-80</a>.
                </p>
            </Grid>
        );
    }
}

export default Delivery;
