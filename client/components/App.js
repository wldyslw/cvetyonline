import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Header from './Header/index'
import Footer from './Footer/index'
import { 
    Catalog, 
    Home, 
    Cart, 
    Contacts, 
    Delivery, 
    NotFound, 
    CatalogPage 
} from './Content/index'
import ScrollMemory from 'react-router-scroll-memory';

const renderFullLayout = (Component) => ({ match, location }) => {
    return (
        <div>
            <Header />
            <Component match={match} />
            <Footer />
        </div>
    );
};

export default (props) => {
    return(
        <Provider store={props.store}>
            <Router>
                    <div>
                        <ScrollMemory />
                        <Switch>
                            <Route exact path='/' render={renderFullLayout(Home)} />
                            <Route exact path='/catalog/:category' render={renderFullLayout(Catalog)} />
                            <Route path='/contacts' render={renderFullLayout(Contacts)} />
                            <Route path='/delivery' render={renderFullLayout(Delivery)} />
                            <Route path='/cart' render={renderFullLayout(Cart)} />
                            <Route path={`/catalog/:category/:id`} render={renderFullLayout(CatalogPage)} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
            </Router>
        </Provider>
    );
}
