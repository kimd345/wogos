import { apiUrl } from '../config';

export const LOAD_COLLECTION = 'LOAD_COLLECTION';
export const CLEAR_COLLECTION = 'CLEAR_COLLECTION';

const loadCollectionAction = collection => ({
  type: LOAD_COLLECTION,
  collection
})

export const clearCollection = () => ({
  type: CLEAR_COLLECTION
})

export const loadCurrentUserCollection = (userId) => async dispatch => {
  const response = await fetch(`${apiUrl}/users/${userId}`);;
  const res = await response.json();
  const collection = {};
  res.orders.forEach(order => collection[order.game_id] = order);
  dispatch(loadCollectionAction(collection))
}
