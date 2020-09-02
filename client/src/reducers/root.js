import { combineReducers } from 'redux';
import auth from './auth';
import cart from './cart';
import games from './games'

const rootReducer = combineReducers({
  auth,
  cart,
  games
});

export default rootReducer;
