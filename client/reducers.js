import { combineReducers } from 'redux';
import naturalCompare from 'string-natural-compare'

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

naturalCompare.alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя';

const sortBy = (state, order) => {
    const newPayload = state.payload.map(e => e);
    switch(order) {
        case 'name': {
            console.log('sorted by name');
            newPayload.sort((a,b) => {
                return naturalCompare(a.name, b.name);
            });
            return ({ 
                isFetching: state.isFetching, 
                payload: newPayload, 
                order: 'name' 
            });
        }
        case 'price': {
            const minPrice = product => Math.min(...product.unit_products.map(e => e.price));
            console.log('sorted by price');
            newPayload.sort((a,b) => {
                if(a.price && b.price) return a.price - b.price;
                if(a.price && b.unit_products) 
                    return a.price - minPrice(b);
                if(a.unit_products && b.price) 
                    return minPrice(a) - b.price;
                if(a.unit_products && b.unit_products) 
                    return minPrice(a) - minPrice(b);
                else return 1;
            });
            return ({ 
                isFetching: state.isFetching, 
                payload: newPayload,
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
