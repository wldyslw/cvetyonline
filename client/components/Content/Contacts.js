import React from 'react'
import {
    Grid,
    Col,
    Row,
    Media,
    PageHeader,
    Glyphicon,
    Button
} from 'react-bootstrap'
import {  } from 'react-router-dom'

class Contacts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid className='grid'>
                <PageHeader className="pageheader">О нас</PageHeader>
                <p style={{fontSize: 18, fontWeight: 300}}>
                    Наши флористы специализируются на классических и авторских букетах, 
                    работают с интересом и душой, а значит каждый заказ, будь то 
                    круглый букет из роз, композиция из орхидей или корзина с тюльпанами, 
                    будет особенным!   
                </p>
                <p style={{fontSize: 18, fontWeight: 300}}>
                    Мы особенно ответственно подходим к качеству и стандартам, Вы можете 
                    быть уверены: букет попадет к получателю в безупречном состоянии! 
                    Дело за малым - выбрать цветы, подумать о красивой подписи и позвонить нам!
                </p>
                {/* <p style={{fontSize: 18, fontWeight: 300}}>
                    Для оформления заказа с доставкой перейдите по <a href='http://booket.by'>ссылке</a> или позвоните по номеру <a href="tel:+375291750880">+375-29-175-08-80</a>
                </p> */}
                <PageHeader className="pageheader">Контакты</PageHeader>
                <p style={{fontSize: 18, fontWeight: 300}}>
                    ИП Лапицкая О. А. УНП 291368395 <br />
                </p>
                <p style={{fontSize: 18, fontWeight: 300}}>Вы всегда можете связаться с нами:</p>
                {/* <p style={{fontSize: 18, fontWeight: 300}}><Glyphicon glyph='home' />г.Минск, ул. 50 лет Победы, 5а</p> */}
                <p style={{fontSize: 18, fontWeight: 300}}><Glyphicon glyph='phone' /><a href="tel:+375291750880">+375-29-175-08-80</a></p>
                <p style={{fontSize: 18, fontWeight: 300}}><Glyphicon glyph='phone' /><a href="tel:+375333770880">+375-33-377-08-80</a></p>
                <p style={{fontSize: 18, fontWeight: 300}}><Glyphicon glyph='phone' /><a href="tel:+375255429443">+375-25-542-94-43</a></p>
                <p style={{fontSize: 18, fontWeight: 300}}><Glyphicon glyph='envelope' /><a href="mailto:cvetyonlineby@gmail.com">cvetyonlineby@gmail.com</a></p>
            </Grid>
        );
    }
}

export default Contacts;
