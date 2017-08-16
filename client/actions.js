import fetch from 'isomorphic-fetch'
import { backend } from './constants'

export const addToCart = (payload, qnty = 1) => ({
    type: 'ADD_TO_CART',
    payload,
    qnty
});

export const removeFromCart = (id) => ({
    type: 'REMOVE_FROM_CART',
    id
});

const requestFlowers = (request) => ({
    type: 'REQUEST_FLOWERS',
    request
})

const recieveFlowers = (payload) => ({
    type: 'RECIEVE_FLOWERS',
    payload
})

export const fetchFlowers = request => dispatch => {
    dispatch(requestFlowers(request));
    const fullRequest = backend.hostname + backend.requestBasePath + request;
    return fetch(fullRequest, {method: 'GET'})
    .then(data => data.json(), err => console.log(`An error occured while fetching of request ${fullRequest}: ${err}`))
    .then(json => {
        console.log(json);
        return dispatch(recieveFlowers(json.length === undefined ? Array.of(json) : json))
    } )
}
