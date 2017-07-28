import React from 'react'
import { Image, Row, Col, Grid, Glyphicon, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap'
import './style'
import '../../assets/images/logo_white.png'

export default () => (
<footer className="footer">
    <Grid>
        <Row>
            <Col md={4}>
                <Image className="footer__logo" src="./img/logo_white.png" responsive />
                <p>
                    ИП Лапицкая О. А. УНП 291368395 <br />
                    Интернет-магазин внесен в Торговый реестр РБ <br />
                    Регистрационный номер: 365314 <br />
                    Свидетельство № 291368395 выдано Пинским городским 
                    исполнительнм комитетом от 27.07.2015
                </p>
                <p>©2017 <a href='http://cvetyonline.by'>CvetyOnline</a>. <br/>
                Дизайн и верстка - <a href='https://vk.com/wldyslw'>Владислав Мальцев</a><br/>
                Хостинг - <a href='https://hoster.by'>hoster.by</a></p>
            </Col>
            <Col md={4}>
                <h4>О нас</h4>
                <p>
                    Наши флористы специализируются на классических и авторских букетах, 
                    работают с интересом и душой, а значит каждый заказ, будь то 
                    круглый букет из роз, композиция из орхидей или корзина с тюльпанами, 
                    будет особенным!   
                </p>
                <p>
                    Мы особенно ответственно подходим к качеству и стандартам, Вы можете 
                    быть уверены: букет попадет к получателю в безупречном состоянии! 
                    Дело за малым - выбрать цветы, подумать о красивой подписи и позвонить нам!
                </p>
            </Col>
            <Col md={4}>
                <h4>Контакты</h4>
                <p>Вы всегда можете связаться с нами:</p>
                <p><Glyphicon glyph='phone' /> +375-29-175-08-80</p>
                <p><Glyphicon glyph='phone' /> +375-33-377-08-80</p>
                <p><Glyphicon glyph='envelope' /> booket@yandex.by</p>
                <Button href='https://vk.com/club75671531' className='footer__social'><i className="fa fa-vk" aria-hidden="true"></i></Button>
                <Button href='https://www.facebook.com/booket.by/' className='footer__social'><i className="fa fa-facebook" aria-hidden="true"></i></Button>
                <Button href='https://www.instagram.com/booket.by/' className='footer__social'><i className="fa fa-instagram" aria-hidden="true"></i></Button>
            </Col>
        </Row>
    </Grid>
</footer>
)
