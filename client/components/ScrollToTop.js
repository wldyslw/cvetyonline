import React from 'react'
import { withRouter } from 'react-router'

require('smoothscroll-polyfill').polyfill();

class ScrollToTop extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop)
