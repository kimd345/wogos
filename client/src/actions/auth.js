import { apiUrl } from '../config';

const TOKEN_KEY = 'gog/auth/token';
const USER_KEY = 'gog/auth/user';
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const SET_USER = 'SET_USER';

export const setToken = token => ({
  type: SET_TOKEN,
  token,
});

export const removeToken = () => ({
  type: REMOVE_TOKEN,
});

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const loadToken = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (token) {
    dispatch(setToken(token));
  }
};

export const loadUser = () => async dispatch => {
  const user = JSON.parse(window.localStorage.getItem(USER_KEY));
  if (user) {
    dispatch(setUser(user));
  }
};

export const login = (email, password) => async dispatch => {
  const response = await fetch(`${apiUrl}/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { token, user } = await response.json();
    console.log('HEEEEEEYYYYYYYYY: ', token, user)
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    dispatch(setToken(token));
    dispatch(setUser(user));
  } else {
    const msg = await response.json();
    console.log(msg);
  }
};

// export const logout = () => async (dispatch, getState) => {
//   const { authentication: { token } } = getState();
//   const response = await fetch(`${apiUrl}/session`, {
//     method: 'DELETE',
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   if (response.ok) {
//     window.localStorage.removeItem(TOKEN_KEY);
//     dispatch(removeToken());
//   }
// };