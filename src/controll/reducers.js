// reducer.js
import { combineReducers } from '@reduxjs/toolkit';
import controllSlice from './controllSlice';

const rootReducer = combineReducers({
  toggle: controllSlice,
}); 

export default rootReducer;
 