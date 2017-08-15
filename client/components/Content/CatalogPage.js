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
    Glyphicon
} from 'react-bootstrap'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Counter from './Counter'
import { fetchFlowers } from '../../actions'
import { categories } from '../../constants'

class CatalogPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { qnty: 1 };
        this.handleCounter = this.handleCounter.bind(this);
        this.renderPage = this.renderPage.bind();
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

    renderPage() {
        if(this.props.flowers.isFetching) return <p>Загрузка...</p>
        if(!this.props.flowers.payload.length && !this.props.flowers.isFetching)
            return (<p>Раздел пуст.</p>)
        return this.props.flowers.payload.map(e => (
            <div>
                <Col className='product' xs={12} sm={6}>
                    <Image className='product-img' src={e.image_paths.high} />
                </Col>
                <Col className='product' xs={12} sm={6}>
                        <h3>{e.name}<Badge className="cart-badge">{e.in_stock}</Badge></h3>
                    <p className='text-muted'>{e.description}</p>
                    <p className='text-muted'>
                       { `Категория: ${categories.find(cat => cat.name == e.category).ally}` }
                    </p>
                    <h3 className='product-price'>{e.price} BYN</h3> 
                    <Counter onChange={this.handleCounter} />
                    <Button onClick={() => this.props.addToCart(e, this.state.qnty)} className='cart-btn' bsStyle='danger'>
                        <Glyphicon glyph='shopping-cart' />
                        В корзину
                    </Button>
                </Col>
            </div>      
        ));
    }

    render() {
        return (
            <Grid className='grid'>
                {/* <PageHeader className="pageheader">Тюльпаны<Badge className="cart-badge">В наличии</Badge></PageHeader> */}
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
        addToCart(product, qnty) { dispatch(addToCart(product, qnty)) }
    })
)(CatalogPage));
