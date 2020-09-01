import { apiUrl } from '../config';

const CART_KEY = 'gog/cart'

export const LOAD_USER_CART = 'LOAD_USER_CART';
export const ADD_TO_CART = 'ADD_TO_USER_CART';

const addToCartAction = item => ({
  type: ADD_TO_CART,
  item
});

export const addToCart = (game_id, user_id) => async dispatch => {
  if (!user_id) {
    const response = await fetch(`${apiUrl}/games/${game_id}`);
    if (response.ok) {
      const item = await response.json();
      let currentCart = window.localStorage.getItem(CART_KEY)
        ? JSON.parse(window.localStorage.getItem(CART_KEY))
        : [];
      currentCart.push(item.id);
      window.localStorage.setItem(CART_KEY, JSON.stringify(currentCart))
      dispatch(addToCartAction(item))
    }
  }
  const response = await fetch(`${apiUrl}/users/${user_id}/cart`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ game_id })
  });

  if (response.ok) {
    const item = await response.json();
    dispatch(addToCartAction(item))
  }
}

export const loadUserCart = (user_id) => async dispatch => {
  // 
  const response = await fetch(`${apiUrl}/users/${user_id}/cart`);
}
