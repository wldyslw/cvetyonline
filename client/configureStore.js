import { createStore, applyMiddleware } from 'redux'
import { throttle } from 'lodash'
import { loadState, saveState } from './localstorage'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'

const configureStore = () => {
    const persistedState = loadState();
    const store =  createStore(
        reducers,
        {
            cart: persistedState.cart
        },
        applyMiddleware(thunkMiddleware)
    );

    store.subscribe(throttle(() => {
        saveState(store.getState());
    }, 1000));

    return store;
}

export default configureStore;
