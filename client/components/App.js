import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import configureStore from '../configureStore'
import Header from './Header/index'
import Footer from './Footer/index'
import { Catalog, Home } from './Content/index'

const store = configureStore();

export default () => {
    return(
        <Provider store={store}>
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/catalog' component={Catalog} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        </Provider>
    );
}
