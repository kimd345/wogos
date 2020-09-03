import {
  LOAD_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART
} from '../actions/cart'

const cartReducer = (state = { items: {} }, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        [action.item.id]: action.item
      }
    }

    case REMOVE_FROM_CART: {
      const nextState = { ...state }
      delete nextState.items[action.id]
      return nextState;
    }

    case LOAD_CART: {
      return {
        ...state,
        items: action.cart
      }
    }

    case LOAD_CART: {
      const nextState = {};
      return nextState;
    }

    default: return state;
  }
}



export default cartReducer;
