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
import { categories } from '../../constants'
import { LinkContainer } from 'react-router-bootstrap'
import './style.styl'
import '../../assets/images/logo_red.png'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state= { catalogOpened: false, modalShow: false };
        this.NavItemLinkHandler = this.NavItemLinkHandler.bind(this);
        this.searchExpander = this.searchExpander.bind(this);
    }

    NavItemLinkHandler() {
        // this.setState({
        //     catalogOpened: true
        // });
    }

    searchExpander() {
        this.setState({
            modalShow: !this.state.modalShow
        });
    }

    render() {
        return (
            <Navbar fixedTop collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link className="navbar-brand-custom" exact to='/'>
                            <img height={40} src="./img/logo_red.png" alt="CvetyOnline" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Badge className="card-badge-collapsable">0</Badge>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <LinkContainer className="navitem" exact to='/'>
                            <NavItem>Главная</NavItem>
                        </LinkContainer>
                        <NavDropdown className={`navitem${this.state.catalogOpened ? ' active' : ''}`} title="Каталог " id="catalogDropdown">
                            {categories.map((e, i) => (
                                <LinkContainer isActive={this.NavItemLinkHandler} activeClassName="" key={i} to='/catalog'>
                                    <MenuItem className="menuitem">{e.ally}</MenuItem>
                                </LinkContainer>
                            ))}
                        </NavDropdown>
                        <NavItem className="navitem">Контакты и доставка</NavItem>
                        <NavItem onClick={this.searchExpander} className="navitem"><Glyphicon glyph="search" /></NavItem>
                        <NavItem className="navitem">
                            <Glyphicon glyph="shopping-cart" />
                            <Badge className="cart-badge">0</Badge>
                        </NavItem>
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
                                    <Button onClick={this.searchExpander}><Glyphicon glyph='search' /></Button>
                                </InputGroup.Button>
                            </InputGroup>
                        </FormGroup>
                    </Modal.Body>
                </Modal>
            </Navbar>
        );
    }
}
