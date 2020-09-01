import {
  LOAD_USER_CART,
  ADD_TO_CART
} from '../actions/cart'

const cartReducer = (state = { items: {} }, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        items: {
          ...state.items,
          [action.item.id]: action.item
        }
      }
    }

    case LOAD_USER_CART: {
      return {
        ...state,
        cart: action.cart_items
      }
    }

    default: return state;
  }
}



export default cartReducer;
