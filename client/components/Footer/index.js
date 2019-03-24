import React from 'react'
import { Image, Row, Col, Grid, Glyphicon, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap'
import './style'
import '../../assets/images/logo_white.png'

export default () => (
<footer className="footer">
    <Grid>
        <Row>
            <Col md={4}>
                <Image className="footer__logo" src="/img/logo_white.png" responsive />
                <p>
                    ИП Лапицкая О. А. УНП 291368395<br />
                    Интернет-витрина внесена в Торговый реестр РБ<br />
                    Регистрационный номер: 365314<br />
                    Свидетельство №291368395 выдано Пинским городским исполнительнм комитетом от 27.07.2015
                </p>
                <p>
                    ©{new Date().getFullYear()} <a href='http://cvetyonline.by'>CvetyOnline</a>.
                </p>
            </Col>
            <Col md={4}>
                <h4>О нас</h4>
                <p>Время работы: ПН-ВС 9:00-21:00</p>
                <p>
                    Адрес нашего магазина: Минский р-н, д. Боровляны, 
                    ул. 40 лет Победы, 43 (Боровлянский с/с 43)
                </p>
                <p>Возможна доставка по Минску и в пределах 5 километров от МКАД</p>
                <p>
                    Наши флористы специализируются на классических и авторских букетах, 
                    работают с интересом и душой, а значит каждый заказ, будь то 
                    круглый букет из роз, композиция из орхидей или корзина с тюльпанами, 
                    будет особенным!   
                </p>
                {/* <p>
                    Для оформления заказа с доставкой перейдите по <a href='http://booket.by'>ссылке</a> или позвоните по номеру <a href="tel:+375291750880">+375-29-175-08-80</a>
                </p> */}
            </Col>
            <Col md={4}>
                <h4>Контакты</h4>
                <p>Вы всегда можете связаться с нами:</p>
                {/* <p><Glyphicon glyph='home' />г.Минск, ул. 50 лет Победы, 5а</p> */}
                <p><Glyphicon glyph='phone' /><a href="tel:+375291750880">+375-29-175-08-80</a></p>
                <p><Glyphicon glyph='phone' /><a href="tel:+375333770880">+375-33-377-08-80</a></p>
                <p><Glyphicon glyph='phone' /><a href="tel:+375255429443">+375-25-542-94-43</a></p>
                <p><Glyphicon glyph='envelope' /> <a href="mailto:T.kichvel@yandex.by">T.kichvel@yandex.by</a></p>
                <Button href='https://vk.com/club75671531' className='footer__social'><i className="fa fa-vk" aria-hidden="true"></i></Button>
                <Button href='https://www.facebook.com/booket.by/' className='footer__social'><i className="fa fa-facebook" aria-hidden="true"></i></Button>
                <Button href='https://www.instagram.com/booket.by/' className='footer__social'><i className="fa fa-instagram" aria-hidden="true"></i></Button>
            </Col>
        </Row>
    </Grid>
</footer>
)
