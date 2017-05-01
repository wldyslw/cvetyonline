import React from 'react'
import ReactDOM from 'react-dom'

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isExpanded: false};
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(e) {
        this.setState({
            isExpanded: window.pageYOffset >= window.innerHeight / 2
        });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <nav className={'navbar' + (this.state.isExpanded ? ' navbar_expanded' : '')}>
                <h1 className="navbar__logo">CvetyOnline</h1>
                <a className="btn navbar__btn">H</a>
                <a className="btn navbar__btn">Another</a>
                <a className="btn navbar__btn">Last</a>
            </nav>
        );
    }
};
