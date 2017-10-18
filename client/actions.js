import fetch from 'isomorphic-fetch'
import { backend } from './constants'

export const addToCart = (payload, qnty = 1, option = null) => ({
    type: 'ADD_TO_CART',
    payload,
    qnty,
    option
});

export const removeFromCart = (id) => ({
    type: 'REMOVE_FROM_CART',
    id
});

export const clearCart = () => ({
    type: 'CLEAR_CART'
})

const requestFlowers = (request) => ({
    type: 'REQUEST_FLOWERS',
    request
})

const recieveFlowers = (payload) => ({
    type: 'RECIEVE_FLOWERS',
    payload
})

export const sortFlowers = (order) => ({
    type: 'SORT_FLOWERS',
    order
})

export const fetchFlowers = request => dispatch => {
    dispatch(requestFlowers(request));
    const fullRequest = backend.hostname + backend.requestBasePath + request;
    return fetch(fullRequest, {method: 'GET'})
    .then(data => data.json(), err => console.log(`An error occured while fetching of request ${fullRequest}: ${err}`))
    .then(json => {
        // console.log(json);
        return dispatch(recieveFlowers(json.length === undefined ? Array.of(json) : json))
    } )
}

const parseOrder = (cart, buyerInfo) => {
    const unit_orders_attributes = cart.map(e => ({
        unit_product_id: e.flower.id,
        quantity: e.qnty
    }));
    const payload = {   
        client_name: buyerInfo.name,
        telephone: buyerInfo.tel,
        pickup: buyerInfo.pickup,
        address: buyerInfo.address,
        comment: buyerInfo.comment,
        unit_orders_attributes
    }
    return JSON.stringify({ order: payload });
}

export const makeOrder = (cart, buyerInfo, callback) => dispatch => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = parseOrder(cart, buyerInfo);
    return fetch(
        backend.hostname + backend.postBasePath, 
        { method: 'post', headers: headers, body: body })
    .then(
        res => {
            if(callback !== undefined) callback.apply(this);
        }, 
        err => console.log('Error occured while recieving order: ', err))
}
