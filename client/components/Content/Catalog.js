import React from 'react';
import { 
    Grid, 
    Col, 
    Row,
    PageHeader, 
    Badge,
    DropdownButton,
    MenuItem
} from 'react-bootstrap'
import Spinner from './Spinner'
import TradingCard from './TradingCard'
import { withRouter } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { fetchFlowers, addToCart, sortFlowers } from '../../actions'
import { categories } from '../../constants'
import './style'

class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pageHeader: 'Каталог' }
        this.renderCatalog = this.renderCatalog.bind(this);
    }

    componentWillMount() {
        const location = this.props.location.pathname.split('/').reverse()[0]
        this.props.loadCategory(location.toString());
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.location.pathname !== this.props.location.pathname) {
            const newLocation = nextProps.location.pathname.split('/').reverse()[0]
            this.props.loadCategory(newLocation.toString());
        }
    }

    renderCatalog() {
        if(this.props.flowers.isFetching) return <Spinner />
        if(!this.props.flowers.payload.length && !this.props.flowers.isFetching) {
            return (<p>Раздел пуст.</p>)
        }
        //if(!this.props.flowers.order) this.props.sortFlowers('name');
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
        const location = this.props.location.pathname.split('/').reverse()[0];
        return (
            <div>
                <Grid className='grid'>
                    <PageHeader className="pageheader">
                        {categories.find(cat => cat.name == location).ally}
                        {this.props.flowers.payload
                        ? <Badge className="cart-badge">{this.props.flowers.payload.length}</Badge>
                        : ''}
                        <div className='pull-right sort-btn'>
                            <DropdownButton id='sorting' title={`Сортировка `}>
                                <MenuItem onClick={() => this.props.sortFlowers('name')}>Имя</MenuItem>
                                <MenuItem onClick={() => this.props.sortFlowers('price')}>Цена</MenuItem>
                            </DropdownButton>
                        </div>
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
        addToCart(product) { dispatch(addToCart(product)) },
        sortFlowers(order) { dispatch(sortFlowers(order)) }
    })
)(Catalog));
