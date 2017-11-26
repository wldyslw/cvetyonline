import React from 'react'
import { 
    Navbar, 
    MenuItem, 
    NavItem, 
    NavDropdown, 
    Nav, 
    Glyphicon, 
    Badge, 
    Modal,
    FormControl, 
    FormGroup, 
    InputGroup,
    Button
} from 'react-bootstrap'
import { NavLink as Link } from 'react-router-dom'
import { matchPath, withRouter } from 'react-router'
import { categories } from '../../constants'
import { LinkContainer } from 'react-router-bootstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { fetchFlowers } from '../../actions'
import './style.styl'
import '../../assets/images/logo_red.png'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state= { modalShow: false };
        this.searchExpander = this.searchExpander.bind(this);
    }

    searchExpander() {
        this.setState({
            modalShow: !this.state.modalShow
        });
    }

    render() {
        const title = (
            <div style={{display: 'inline'}}>
                <Glyphicon className='nav-icon' glyph="list" />
                Каталог
            </div>
        );
        const location = this.props.location;
        const isActive = !!location.pathname.match(/\/catalog(\/w+)*/g);
        return (
            <Navbar fixedTop collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link className="navbar-brand-custom" exact to='/'>
                            <img height={30} src="/img/logo_red.png" alt="CvetyOnline" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    {this.props.cart.length > 0
                    ? <Badge className="card-badge-collapsable">{this.props.cart.length}</Badge>
                    : ''}
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <LinkContainer className="navitem" exact to='/'>
                            <NavItem><Glyphicon className='nav-icon' glyph="home" />Главная</NavItem>
                        </LinkContainer>
                        <NavDropdown className={`navitem${isActive ? ' active' : ''}`} title={title} id="catalogDropdown1">
                            {categories.map((e, i) => (
                                <LinkContainer activeClassName="" key={i} to={`/catalog/${e.name}`}>
                                    <MenuItem onClick={() => this.props.loadCategory(e.name) } className="menuitem">{e.ally}</MenuItem>
                                </LinkContainer>
                            ))}
                        </NavDropdown>
                        <LinkContainer className="navitem" exact to='/contacts'>
                            <NavItem><Glyphicon className='nav-icon' glyph="phone-alt" />Контакты</NavItem>
                        </LinkContainer>
                        <LinkContainer className="navitem" exact to='/delivery'>
                            <NavItem><Glyphicon className='nav-icon' glyph="send" />Условия покупки</NavItem>
                        </LinkContainer>
                        {/* <NavItem onClick={this.searchExpander} className="navitem"><Glyphicon glyph="search" /></NavItem> */}
                        {/* <LinkContainer activeClassName='' className="navitem" exact to='/cart'>
                            <NavItem className="navitem">
                                <Glyphicon glyph="shopping-cart" />
                                {this.props.cart.length > 0
                                ? <Badge className="cart-badge">{this.props.cart.length}</Badge>
                                : ''}
                            </NavItem>
                        </LinkContainer>                         */}
                    </Nav>
                </Navbar.Collapse>
                <Modal show={this.state.modalShow} onHide={this.searchExpander}>
                    <Modal.Header closeButton>
                        <Modal.Title>Поиск по сайту</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <InputGroup>
                                <FormControl type="text" />
                                <InputGroup.Button>
                                    <Button bsStyle='danger' onClick={this.searchExpander}><Glyphicon glyph='search' /></Button>
                                </InputGroup.Button>
                            </InputGroup>
                        </FormGroup>
                    </Modal.Body>
                </Modal>
            </Navbar>
        );
    }
}

export default withRouter(connect(
    state => ({
        cart: state.cart
    }),
    dispatch => ({
        loadCategory(category) { dispatch(fetchFlowers(`/category/${category}`)) }
    })
)(Header));
