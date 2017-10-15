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
    Carousel
} from 'react-bootstrap'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Counter from './Counter'
import { fetchFlowers, addToCart } from '../../actions'
import { categories, backend } from '../../constants'

class CatalogPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { qnty: 1, option: null };
        this.handleCounter = this.handleCounter.bind(this);
        this.renderPage = this.renderPage.bind(this);
        this.renderWithOptions = this.renderWithOptions.bind(this);
        this.changeOption = this.changeOption.bind(this);
        this.renderImage = this.renderImage.bind(this);
    }

    componentWillMount() {
        const location = this.props.location.pathname.split('/').reverse()[0]
        this.props.loadProductPage(location.toString());
    }

    handleCounter(value) {
        this.setState({
            qnty: value
        });
        //console.log(value);
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
            <Carousel>
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

    renderPage() {
        if(this.props.flowers.isFetching) return <p>Загрузка...</p>
        if(!this.props.flowers.payload.length && !this.props.flowers.isFetching)
            return (<p>Раздел пуст.</p>)
        const e = this.props.flowers.payload[0];
        return (
            <div>
                <Col className='product' xs={12} sm={6}>
                    { this.renderImage() }
                </Col>
                <Col className='product' xs={12} sm={6}>
                        <h3>{e.name}<Badge className="cart-badge">{e.in_stock ? 'В наличии' : 'Нет в наличии'}</Badge></h3>
                    <p className='text-muted'>{e.description}</p>
                    <p className='text-muted'>
                       { `Категория: ${categories.find(cat => cat.name == e.category).ally}` }
                    </p>
                    {this.renderWithOptions()}
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
