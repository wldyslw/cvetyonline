import React from 'react'
import {
    Grid,
    Col,
    Row,
    Media,
    PageHeader,
    Badge,
    Image,
    Button,
    Glyphicon,
    FormControl,
    FormGroup,
    Carousel,
    Table
} from 'react-bootstrap'
import Spinner from './Spinner'
import { withRouter, Redirect } from 'react-router'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Counter from './Counter'
import { fetchFlowers, addToCart } from '../../actions'
import { categories, backend } from '../../constants'

class CatalogPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { qnty: 1, option: null };
        const location = this.props.location.pathname.split('/').reverse()[0]
        this.props.loadProductPage(location.toString());
        this.handleCounter = this.handleCounter.bind(this);
        this.renderPage = this.renderPage.bind(this);
        this.renderWithOptions = this.renderWithOptions.bind(this);
        this.changeOption = this.changeOption.bind(this);
        this.renderImage = this.renderImage.bind(this);

        this.renderPrice = this.renderPrice.bind(this);
    }

    handleCounter(value) {
        this.setState({
            qnty: value
        });
    }

    changeOption(e) {
        const target = e.target.value;
        this.setState({
            option: target !== null ? this.props.flowers.payload[0].unit_products.find(e => e.property === target) : null
        });
    }

    renderImage() {
        const imagePaths = this.props.flowers.payload[0].images.length !== 0 
        ? this.props.flowers.payload[0].images.map(e => `${backend.hostname + e.high}`)
        : [];
        if(imagePaths.length !== 0) return (
            <Carousel indicators={imagePaths.length > 1} controls={imagePaths.length > 1} >
                {imagePaths.map(e => {
                    return (
                        <Carousel.Item key={e}>
                            <img src={e}/>
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        );
        return <Image className='product-img' src='/img/missing.png' />
    }

    renderWithOptions() {
        const payload = this.props.flowers.payload[0];
        const unit_products = payload.unit_products;
        if(unit_products) {
            return(
                <div>
                    <FormGroup controlId="formControlsSelect">
                        <FormControl onChange={this.changeOption} defaultValue={null} componentClass="select" placeholder="Выберите вариант">
                            <option value={null}>Выберите вариант</option>
                            {unit_products.map(e => <option key={e.id} value={e.property}>{e.property}</option> )}
                        </FormControl>
                    </FormGroup>
                    {this.state.option 
                    ? <div>
                        <h3 className='product-price'>{this.state.option.price} BYN</h3>
                        <Counter onChange={this.handleCounter} />
                        <Button onClick={() => this.props.addToCart(payload, this.state.qnty, this.state.option)} className='cart-btn' bsStyle='danger'>
                            <Glyphicon glyph='shopping-cart' />
                            В корзину
                        </Button>
                    </div>                    
                    : ''}
                </div>
            );
        }
        return (
            <div>
                <h3 className='product-price'>{payload.price} BYN</h3>
                <Counter onChange={this.handleCounter} />
                <Button onClick={() => this.props.addToCart(payload, this.state.qnty)} className='cart-btn' bsStyle='danger'>
                    <Glyphicon glyph='shopping-cart' />
                    В корзину
                </Button>
            </div>
        );
    }

    renderPrice() {
        const payload = this.props.flowers.payload[0];
        const unit_products = payload.unit_products;
        if(unit_products && unit_products.length > 0) {
            const priceArr = unit_products.map(e => e.price);
            // return <h3 className='product-price'>{`${Math.min(...priceArr)} — ${Math.max(...priceArr)} BYN`}</h3>
            return (
                <Table responsive hover>
                    <tbody>
                        {unit_products.map(e => (
                            <tr key={e.id}>
                                <td>{e.property}</td>
                                <td className='price'>{`${e.price} BYN`}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            );
        }
        else if(payload.price) return <h3 className='product-price'>{`${payload.price} BYN`}</h3>
        else return <h3 className='product-price'>Цену уточняйте</h3>;
    }

    renderPage() { 
        if(this.props.flowers.isFetching) return <Spinner />
        if(!this.props.flowers.isFetching && !this.props.flowers.payload.length) {
            return <Redirect to='/not-found' />
        }
        const e = this.props.flowers.payload[0];
        return (
            <div>
                <Col className='product' xs={12} sm={6}>
                    { this.renderImage() }
                </Col>
                <Col className='product' xs={12} sm={6}>
                        <h3>{e.name}<Badge className="cart-badge">{e.in_stock ? 'В наличии' : 'Под заказ'}</Badge></h3>
                    <p className='text-muted'>{e.description}</p>
                    <p className='text-muted'>
                        {`Категория: `}
                        <NavLink className='category-link' exact to={`/catalog/${e.category}`}>{categories.find(cat => cat.name == e.category).ally}</NavLink>
                    </p>
                    {/* {this.renderWithOptions()} */}
                    {this.renderPrice()}
                </Col>
            </div>
        );
    }

    render() {
        return (
            <Grid className='grid'>
                <Row>
                    { this.renderPage() }
                </Row>
            </Grid>
        );
    }
}

export default withRouter(connect(
    state => ({
        flowers: state.flowers
    }),
    dispatch => ({
        loadProductPage(id) { dispatch(fetchFlowers(`/id/${id}`)) },
        addToCart(product, qnty, option) { dispatch(addToCart(product, qnty, option)) }
    })
)(CatalogPage));
