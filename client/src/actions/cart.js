import { apiUrl } from '../config';

const CART_KEY = 'gog/cart'

export const LOAD_CART = 'LOAD_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

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

export const addToCart = (game_id, user_id) => async dispatch => {
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
  
  // TODO: if user signed in then post change to db
  // const response = await fetch(`${apiUrl}/users/${user_id}/cart`, {
  //   method: 'post',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ game_id })
  // });

  // if (response.ok) {
  //   const item = await response.json();
  //   dispatch(addToCartAction(item))
  // }
}

export const removeFromCart = (game_id) => async (dispatch, getState) => {
  let currentCart = JSON.parse(window.localStorage.getItem(CART_KEY));
  delete currentCart[game_id];
  window.localStorage.setItem(CART_KEY, JSON.stringify(currentCart))

  dispatch(removeFromCartAction(game_id))
  dispatch(loadCart());
}

export const loadCart = (user_id) => async (dispatch, getState) => {
  let currentCart = window.localStorage.getItem(CART_KEY);
  currentCart
    ? currentCart = JSON.parse(currentCart)
    : currentCart = {};
  dispatch(loadCartAction(currentCart))

  // TODO: if user signed in then set current cart to values in db
}
