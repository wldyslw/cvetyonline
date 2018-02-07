import React from 'react';
import { 
    Grid, 
    Col, 
    Row, 
    Carousel, 
    Button, 
    Badge,
    PageHeader ,
} from 'react-bootstrap';
import Spinner from './Spinner'
import { LinkContainer } from 'react-router-bootstrap'
import TradingCard from './TradingCard'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchFlowers, addToCart } from '../../actions'
import { backend } from '../../constants'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.renderCatalog = this.renderCatalog.bind(this);
        this.renderImage = this.renderImage.bind(this);
        this.parseHeader = this.parseHeader.bind(this);
        this.parseDescription = this.parseDescription.bind(this);
    }

    componentWillMount() {
        this.props.loadFeatured();
    }

    renderImage(describer) {
        const imagePath = describer.images.length !== 0 ? `${backend.hostname + describer.images[0].high}` : '/img/missing.png'
        return <img src={imagePath} alt={describer.name} />
    }

    parseDescription(description) {
        return description.length > 60
        ? `${description.slice(0, 59).trim()}...`
        : description
    }

    parseHeader(header) {
        return header.length > 30
        ? `${header.slice(0, 29).trim()}...`
        : header
    }

    renderCatalog() {
        if(this.props.flowers.isFetching) return <Spinner />
        if(!this.props.flowers.payload.length && !this.props.flowers.isFetching)
            return <PageHeader className="pageheader">Раздел пуст.</PageHeader>
        return (
            <div>
                <Carousel className='carousel-home'>
                    {this.props.flowers.payload.map((e, i) => {
                        if(i < 3) return (
                            <Carousel.Item key={e.id}>
                                { this.renderImage(e) }
                                <Carousel.Caption>
                                    <h3>{this.parseHeader(e.name)}</h3>
                                    <p>{this.parseDescription(e.description)}</p>
                                    <LinkContainer exact to={`/catalog/${e.category + '/' + e.id}`}>
                                        <Button bsSize='large' bsStyle='danger'>Узнать больше</Button>
                                    </LinkContainer>
                                </Carousel.Caption>
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
                <Row>
                    <PageHeader className="pageheader">Избранные товары<Badge className="cart-badge">{this.props.flowers.payload.length}</Badge></PageHeader>
                    {this.props.flowers.payload.map(e => (
                        <Col key={e.id} xs={12} sm={6} md={4} lg={3}>
                            <TradingCard 
                                onAdd={() => this.props.addToCart(e)}
                                describer={e}
                            />
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }

    render() {
        return (
            <Grid className='grid'>
                {this.renderCatalog()}
            </Grid>
        );
    }
}

export default connect(
    state => ({
        flowers: state.flowers
    }),
    dispatch => ({
        loadFeatured() { dispatch(fetchFlowers('/featured')) },
        addToCart(product) { dispatch(addToCart(product)) }
    })
)(Home)
