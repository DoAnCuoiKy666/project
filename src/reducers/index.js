import { combineReducers } from 'redux';
import UserReducer from './user';
import ErrorReducer from './error';
import ProgressReducer from './progress';

const reducers = {
 user:UserReducer,
 error:ErrorReducer,
 progress:ProgressReducer

};

export default combineReducers(reducers);