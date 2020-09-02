import {
  LOAD_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
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
      // console.log(state.items[action.id])
      delete state.items[action.id]
      // console.log(state.items[action.id])
      return {
        ...state,
      }
    }

    case LOAD_CART: {
      return {
        ...state,
        items: action.cart
      }
    }

    default: return state;
  }
}



export default cartReducer;
