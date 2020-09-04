import { apiUrl } from '../config';

const CART_KEY = 'gog/cart'

export const LOAD_CART = 'LOAD_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

const addToCartAction = item => ({
  type: ADD_TO_CART,
  item
});

const removeFromCartAction = id => ({
  type: REMOVE_FROM_CART,
  id
});

const loadCartAction = cart => ({
  type: LOAD_CART,
  cart
})

const clearCartAction = () => ({
  type: CLEAR_CART,
})

export const addToCart = (game_id) => async dispatch => {
  const response = await fetch(`${apiUrl}/games/${game_id}`);
  if (response.ok) {
    const item = await response.json();
    let currentCart = window.localStorage.getItem(CART_KEY)
      ? JSON.parse(window.localStorage.getItem(CART_KEY))
      : {};
    currentCart[item.id] = item;
    window.localStorage.setItem(CART_KEY, JSON.stringify(currentCart))
    dispatch(addToCartAction(item))
  }
  dispatch(loadCart())
}

export const removeFromCart = (game_id) => async (dispatch) => {
  let currentCart = JSON.parse(window.localStorage.getItem(CART_KEY));
  delete currentCart[game_id];
  window.localStorage.setItem(CART_KEY, JSON.stringify(currentCart))

  dispatch(removeFromCartAction(game_id))
  dispatch(loadCart())
}
  
  export const loadCart = () => async (dispatch) => {
    let currentCart = window.localStorage.getItem(CART_KEY);
    currentCart
  ? currentCart = JSON.parse(currentCart)
  : currentCart = {};
  
  dispatch(loadCartAction(currentCart))
}

export const clearCart = () => dispatch => {
  window.localStorage.removeItem(CART_KEY);
  dispatch(clearCartAction());
  dispatch(loadCart());
}
