import { combineReducers } from 'redux';

const cart = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TO_CART': {
            if(action.option) {
                action.payload.id = action.option.id;
                action.payload.price = action.option.price;
            }
            if(state.some(e => e.flower.id == action.payload.id)) {
                const newState = state;
                newState.map(e => {
                    if(e.flower.id == action.payload.id) e.qnty += 1;
                });
                return newState;
            } else return [...state, { flower: action.payload, qnty: action.qnty }]
        }
        case 'REMOVE_FROM_CART': return state.filter(e => e.flower.id !== action.id);
        case 'CLEAR_CART': return [];
        default: return state;
    }
};

const flowers = (state = { isFetching: false, payload: [] }, action) => {
    switch(action.type) {
        case 'RECIEVE_FLOWERS': return { isFetching: false, payload: action.payload !== undefined ? action.payload : [] } 
        case 'REQUEST_FLOWERS': return { isFetching: true, payload: [] }
        default: return state;
    }
}


const app = combineReducers({ cart, flowers });

export default app;
