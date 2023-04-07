import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Alums} from './alums';
import {Posts} from './posts';
import {Auth} from './auth';
import {Signup} from './signup';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore=()=>{
    const store=createStore(
        combineReducers({
            alums:Alums,
            posts:Posts,
            auth:Auth,
            signup:Signup
        }),
        applyMiddleware(thunk,logger)
    );
    return store;
}