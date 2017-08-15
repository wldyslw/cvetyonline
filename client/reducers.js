import { combineReducers } from 'redux';

const cart = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TO_CART': {
            if(state.some(e => e.flower.id == action.payload.id)) {
                const newState = state;
                newState.map(e => {
                    if(e.flower.id == action.payload.id) e.qnty += 1;
                });
                return newState;
            } else return [...state, { flower: action.payload, qnty: action.qnty }]
        }
        case 'REMOVE_FROM_CART': return state.filter(e => e.flower.id !== action.id);
        default: return state;
    }
};

const flowers = (state = { isFetching: false, payload: [] }, action) => {
    switch(action.type) {
        case 'RECIEVE_FLOWERS': return { isFetching: false, payload: action.payload }
        case 'REQUEST_FLOWERS': return Object.assign({}, state, { isFetching: true })
        default: return state;
    }
}


const app = combineReducers({ cart, flowers });

export default app;
