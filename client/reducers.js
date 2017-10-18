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

const sortBy = (state, order) => {
    switch(order) {
        case 'name': {
            const newPayload = state.payload.map(e => e);
            newPayload.sort((a,b) => {
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                if(a.name == b.name) return 0;
            });
            return { isFetching: state.isFetching, payload: newPayload, order: 'name' }
        }
        case 'price': {
            console.log('sorted by price')
            return ({ 
                isFetching: state.isFetching, 
                payload: state.payload,
                order: 'price'
            });
        }
    }
}

const flowers = (state = { isFetching: false, payload: [], order: '' }, action) => {
    switch(action.type) {
        case 'RECIEVE_FLOWERS': return { isFetching: false, payload: action.payload !== undefined ? action.payload : [] } 
        case 'REQUEST_FLOWERS': return { isFetching: true, payload: [] }
        case 'SORT_FLOWERS': {
            if(state.isFetching !== true && action.order !== state.order) {
                return sortBy(state, action.order);
            }
            return state;
        }
        default: return state;
    }
}


const app = combineReducers({ cart, flowers });

export default app;
