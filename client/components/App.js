import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Header from './Header/index'
import Footer from './Footer/index'
import { Catalog, Home, Cart, Contacts, Delivery, NotFound } from './Content/index'
import ScrollToTop from './ScrollToTop'

const renderFullLayout = (Component) => () => (
    <div>
        <Header />
        <Component />
        <Footer />
    </div>
);

export default (props) => {
    return(
        <Provider store={props.store}>
            <Router>
                <ScrollToTop>
                    <div>
                        <Switch>
                            <Route exact path='/' render={renderFullLayout(Home)} />
                            <Route path='/catalog' render={renderFullLayout(Catalog)} />
                            <Route path='/contacts' render={renderFullLayout(Contacts)} />
                            <Route path='/delivery' render={renderFullLayout(Delivery)} />
                            <Route path='/cart' render={renderFullLayout(Cart)} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </ScrollToTop>
            </Router>
        </Provider>
    );
}
