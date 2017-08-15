import React from 'react';
import { 
    Grid, 
    Col, 
    Row,
    PageHeader, 
    Badge
} from 'react-bootstrap'
import TradingCard from './TradingCard'
import { withRouter } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { fetchFlowers, addToCart } from '../../actions'
import { categories } from '../../constants'
import './style'
import '../../assets/images/example.jpg'
import '../../assets/images/example2.jpg'

class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pageHeader: 'Каталог' }
        this.renderCatalog = this.renderCatalog.bind(this);
    }

    componentWillMount() {
        const location = this.props.location.pathname.split('/').reverse()[0]
        this.setState({
            pageHeader: categories.find(cat => cat.name == location).ally
        })
        this.props.loadCategory(location.toString());
    }

    renderCatalog() {
        if(this.props.flowers.isFetching) return <p>Загрузка...</p>
        if(!this.props.flowers.payload.length && !this.props.flowers.isFetching)
            return (<p>Раздел пуст.</p>)
        return this.props.flowers.payload.map(e => (
            <Col key={e.id} xs={12} sm={6} md={4} lg={3}>
                <TradingCard 
                    onAdd={() => this.props.addToCart(e)}
                    describer={e}
                />
            </Col>        
        ));
    }

    render() {
        return (
            <div>
                <Grid className='grid'>
                    <PageHeader className="pageheader">
                        {this.state.pageHeader}
                        {this.props.flowers.payload
                        ? <Badge className="cart-badge">{this.props.flowers.payload.length}</Badge>
                        : ''}
                    </PageHeader>
                    <Row>{this.renderCatalog()}</Row>
                </Grid>
            </div>
        );
    }
}

export default withRouter(connect(
    state => ({
        flowers: state.flowers
    }),
    dispatch => ({
        loadCategory(category) { dispatch(fetchFlowers(`/category/${category}`)) },
        addToCart(product) { dispatch(addToCart(product)) }
    })
)(Catalog));
