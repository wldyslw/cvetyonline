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
import {  } from 'react-router-dom'
import { removeFromCart, makeOrder } from '../../actions'
import { backend } from '../../constants'

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            checkoutExpanded: false, 
            ordered: false,
            buyerInfo: {
                tel: '',
                address: '',
                comment: '',
                pickup: false
            } 
        };
        this.checkoutExpander = this.checkoutExpander.bind(this);
        this.submitOrder = this.submitOrder.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    checkoutExpander() {
        this.setState({
            checkoutExpanded: !this.state.checkoutExpanded
        })
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
        console.log('submiting...')
        const callback = thisArg => () => {
            thisArg.setState({
                ordered: true
            });
            console.log(this.state);
        };
        this.props.makeOrder(
            this.props.cart,
            this.state.buyerInfo,
            callback(this)
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
                    <Modal.Body>
                        {/* <FormGroup>
                            <InputGroup>
                                <FormControl type="text" />
                                <InputGroup.Button>
                                    <Button bsStyle='danger' onClick={this.checkoutExpander}><Glyphicon glyph='search' /></Button>
                                </InputGroup.Button>
                            </InputGroup>
                        </FormGroup> */}
                        <Form horizontal>
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
        makeOrder(cart, buyerInfo, callback) { dispatch(makeOrder(cart, buyerInfo, callback)) }
    })
)(Cart);
