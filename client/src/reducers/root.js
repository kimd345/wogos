import { combineReducers } from 'redux';
import auth from './auth';
import cart from './cart';
import games from './games'
import collection from './collection'

const rootReducer = combineReducers({
  auth,
  cart,
  games,
  collection
});

export default rootReducer;
