import { createStore } from 'redux'
import { throttle } from 'lodash'
import { loadState, saveState } from './localstorage'
import reducers from './reducers'

const configureStore = () => {
    const persistedState = loadState();
    const store =  createStore(
        reducers,
        persistedState
    );

    store.subscribe(throttle(() => {
        saveState(store.getState());
    }, 1000));

    return store;
}

export default configureStore;
