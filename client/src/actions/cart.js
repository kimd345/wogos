import { apiUrl } from '../config';

export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const LOAD_CART = 'LOAD_CART'

const addToCart = item => ({
  type: ADD_TO_CART,
  item,
})

const removeFromCart = item => ({
  type: REMOVE_FROM_CART,
  item,
})

const loadCart = data => ({
  type: LOAD_CART,
  data
})
