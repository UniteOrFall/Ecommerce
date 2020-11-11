import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED,
    AUTH_ERR,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    ADDED_CART
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    cart: null
}

export default function(state = initialState, action){

    const {type,payload} = action;
    switch(type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
            case USER_LOADED: 
            localStorage.setItem('LocalCard',JSON.stringify(payload.cart));
            return{
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
                cart: payload.cart
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERR:
        case LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('LocalCard');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                cart: null
            }
        case ADDED_CART:
           
            return {
                ...state,
                cart: JSON.parse(localStorage.getItem("LocalCard"))
            }
        default: return state;

    }
}