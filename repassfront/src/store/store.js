import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import { thunk } from 'redux-thunk';

import tasksReducer from '../reducers/taskreducer';


let reducers = combineReducers({
    tasks: tasksReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;