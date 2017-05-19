import React from 'react'
import ReactDOM from 'react-dom'
import './header.styl'

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isFixed: false};
        this.handleState = this.handleState.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(e) {
        this.setState({
            isFixed: window.pageYOffset >= 125
        });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleState() {}
    
    render() {
        const headerClass = `header${this.props.collapsed ? ' header_collapsed' : ''}`
        return (
            <header id="header" className={ headerClass }>
                <div className="subheader">
                    <div className="container">
                        <a href="#" className="subheader__btn">Контакты</a>
                        <a href="#" className="subheader__btn">Адреса магазинов</a>
                        <a href="#" className="subheader__btn">О нас</a>
                    </div>
                </div>
                <div className="container">
                    <h1 onClick={this.props.onNavigate} className="header__logo noselect">CvetyOnline</h1>
                </div>
                <nav className={`navbar${this.state.isFixed ? ' navbar_fixed' : ''}`}>
                    <div className="container">
                        {this.props.categories.map((e, i) => {
                            return <button onClick={this.props.onNavigate} key={i} className="navbar__btn">{e.toString()}</button>
                        })}
                        <button className="navbar__basket">Корзина</button>
                    </div>
                </nav>
                
            </header>
        );
    }
};
