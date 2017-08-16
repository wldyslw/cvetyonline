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
    }

    componentWillMount() {
        this.props.loadFeatured();
    }

    renderCatalog() {
        if(this.props.flowers.isFetching) return <PageHeader className="pageheader">Загрузка...</PageHeader>
        if(!this.props.flowers.payload.length && !this.props.flowers.isFetching)
            return <PageHeader className="pageheader">Раздел пуст.</PageHeader>
        return (
            <div>
                <Carousel>
                    {this.props.flowers.payload.map((e, i) => {
                        if(i < 3) return (
                            <Carousel.Item key={e.id}>
                                <img src={backend.hostname + e.image_paths.high}/>
                                <Carousel.Caption>
                                    <h3>{e.name}</h3>
                                    <p>{e.description}</p>
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
