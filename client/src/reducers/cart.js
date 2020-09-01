import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  LOAD_CART
} from '../actions/cart'

const cartReducer = (state = { items: {} }, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        items: {
          [action.item.id]: action.item
        }
      }
    }

    case REMOVE_FROM_CART: {
      return {
        ...state

      }
    }

    case LOAD_CART: {
      return {
        ...state
      }
    }

    default: return state;
  }
}

export default cartReducer;
