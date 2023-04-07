import * as ActionTypes from './ActionTypes';

export const Signup = (state = {
    isLoading: false,
    isRegistered: false,
    user: null,
    errMess: null
}, action) => {
    switch (action.type) {
        case ActionTypes.SIGNUP_REQUEST:
            return { ...state, isLoading: true, isRegistered: false, user: action.payload, errMess: null };
        case ActionTypes.SIGNUP_SUCCESS:
            return { ...state, isLoading: false, isRegistered: true, user: action.payload, errMess: null };
        case ActionTypes.SIGNUP_FAILURE:
            return { ...state, isLoading: false, isRegistered: false, user: null, errMess: action.payload };
        default:
            return state;
    }
}