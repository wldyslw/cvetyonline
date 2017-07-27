import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import configureStore from '../configureStore'
import Header from './Header/index'

const store = configureStore();

export default () => {
    return(
        <Provider store={store}>
            <Router>
                <Header />
                {/* <Route exact path='/' />
                <Footer /> */}
            </Router>
        </Provider>
    );
}
