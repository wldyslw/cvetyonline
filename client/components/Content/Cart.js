import React from 'react'
import {
    Grid,
    Col,
    Row,
    Media,
    PageHeader,
    Badge,
    Button,
    Glyphicon,
    Table,
    Image,
    Modal,
    Form,
    FormControl,
    FormGroup,
    InputGroup,
    ControlLabel,
    Checkbox
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { NavLink as Link } from 'react-router-dom'
import { removeFromCart, makeOrder, clearCart } from '../../actions'
import { backend } from '../../constants'

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            checkoutExpanded: false, 
            ordered: false,
            buyerInfo: {
                name: '',
                tel: '',
                address: '',
                comment: '',
                pickup: false
            } 
        };
        this.checkoutExpander = this.checkoutExpander.bind(this);
        this.submitOrder = this.submitOrder.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.renderModal = this.renderModal.bind(this);
    }

    checkoutExpander() {
        this.setState({
            checkoutExpanded: !this.state.checkoutExpanded
        })
        if(this.state.ordered) this.props.clearCart();
    }

    handleInputChange(event) {
        const value = event.target.value.trim();
        const name = event.target.name;
        const buyerInfo = this.state.buyerInfo;
        buyerInfo[name] = value;
        this.setState({
            buyerInfo
        })
    }

    submitOrder() {
        const callback = thisArg => () => {
            thisArg.setState({
                ordered: true
            });
            thisArg.setState({
                checkoutExpanded: true
            });
        };
        this.props.makeOrder(
            this.props.cart,
            this.state.buyerInfo,
            callback(this)
        );        
    }

    renderModal(ordered) {
        if(!ordered) return (
            <div>
                <Modal.Body>
                    <Form horizontal>
                    <FormGroup controlId="formName">
                            <Col componentClass={ControlLabel} sm={2}>
                                Ваше имя
                            </Col>
                            <Col sm={10}>
                                <FormControl onChange={this.handleInputChange} name='name' type="text" placeholder="" />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formTel">
                            <Col componentClass={ControlLabel} sm={2}>
                                Телефон
                            </Col>
                            <Col sm={10}>
                                <FormControl onChange={this.handleInputChange} name='tel' type="tel" placeholder="" />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formAddress">
                            <Col componentClass={ControlLabel} sm={2}>
                                Адрес доставки
                            </Col>
                                <Col sm={10}>
                            <FormControl onChange={this.handleInputChange} name='address' type="text" placeholder="" />
                        </Col>
                        </FormGroup>

                        <FormGroup controlId="formComment">
                            <Col componentClass={ControlLabel} sm={2}>
                                Комментарии
                            </Col>
                            <Col sm={10}>
                                <FormControl onChange={this.handleInputChange} name='comment' type="text" placeholder="" />
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.checkoutExpander} className='cart-btn'>Закрыть</Button>
                    <Button onClick={this.submitOrder} className='cart-btn' bsStyle="danger">Отправить заказ</Button>
                </Modal.Footer>
            </div>
        );
        else return (
            <div>
                <Modal.Body>
                    <h4 className='text-center'>Успешно!</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Link exact to='/' role='button' onClick={this.checkoutExpander} className='cart-btn btn btn-danger'>Вернуться на главную</Link>
                </Modal.Footer>
            </div>
        );
    }

    render() {
        // console.log('cart:', this.props.cart)
        const total = this.props.cart.reduce((p, c) => p + c.flower.price * c.qnty, 0)
        if(total == 0) return (
            <Grid className='grid'>
                <PageHeader className="pageheader">Ваша корзина пуста</PageHeader>
            </Grid>
        );
        return (
            <Grid className='grid'>
                <PageHeader className="pageheader">Корзина<Badge className="cart-badge">{this.props.cart.length}</Badge></PageHeader>
                <Row>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Товар</th>
                                <th className='hidden-xs'>Цена</th>
                                <th>Кол-во</th>
                                <th>Сумма</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.cart.map(e => (
                                <tr key={e.flower.id}>
                                    <td>
                                        <Button onClick={() => this.props.remove(e.flower.id)} className='close'>
                                            <Glyphicon glyph='remove' />
                                        </Button>
                                        <Image className='cart-img' src={backend.hostname + e.flower.image_paths.thumb} />
                                    </td>
                                    <td>{e.flower.name}</td>
                                    <td className='hidden-xs'>{`${e.flower.price} BYN`}</td>
                                    <td>{e.qnty}</td>
                                    <td>{`${e.flower.price * e.qnty} BYN`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <h4 className='pull-right cart-sum'>{`ИТОГO: ${total} BYN`}</h4>
                    <Button onClick={this.checkoutExpander} className='cart-btn cart-sum pull-right' bsStyle='danger'>
                        Оформить заказ
                    </Button>
                </Row>
                <Modal show={this.state.checkoutExpanded} onHide={this.checkoutExpander}>
                    <Modal.Header closeButton>
                        <Modal.Title>Оформление заказа</Modal.Title>
                    </Modal.Header>
                    {this.renderModal(this.state.ordered)}
                </Modal>
            </Grid>
        );
    }
}

export default connect(
    state => ({
        cart: state.cart
    }),
    dispatch => ({
        remove(id) { dispatch(removeFromCart(id)) },
        makeOrder(cart, buyerInfo, callback) { dispatch(makeOrder(cart, buyerInfo, callback)) },
        clearCart() { dispatch(clearCart()) }
    })
)(Cart);
