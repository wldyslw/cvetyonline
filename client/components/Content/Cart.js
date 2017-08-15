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
    Image
} from 'react-bootstrap'
import { connect } from 'react-redux'
import {  } from 'react-router-dom'
import { removeFromCart } from '../../actions'

class Cart extends React.Component {
    constructor(props) {
        super(props);
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
                                        <Image className='cart-img' src='/img/example.jpg' />
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
                    <Button className='cart-btn cart-sum pull-right' bsStyle='danger'>
                        Оформить заказ
                    </Button>
                </Row>
            </Grid>
        );
    }
}

export default connect(
    state => ({
        cart: state.cart
    }),
    dispatch => ({
        remove(id) { dispatch(removeFromCart(id)) }
    })
)(Cart);
