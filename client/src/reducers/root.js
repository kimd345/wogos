import { combineReducers } from 'redux';
import auth from './auth';
import cart from './cart';

const rootReducer = combineReducers({
  auth,
  cart,
});

export default rootReducer;
