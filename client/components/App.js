import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import configureStore from '../configureStore'

const store = configureStore(reducers);

export default (
    <Provider store={}>
        <Router>
            //
        </Router>
    </Provider>
);
