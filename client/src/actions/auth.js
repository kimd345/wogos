import { apiUrl } from '../config';

const TOKEN_KEY = 'gog/auth/token';
const USER_KEY = 'gog/auth/user';
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

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

export const removeUser = () => ({
  type: REMOVE_USER,
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
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { token, user } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    dispatch(setUser(user));
    dispatch(setToken(token));
  } else {
    const msg = await response.json();
    console.log(msg);
  }
};

export const signup = (username, email, password) => async dispatch => {
  const response = await fetch(`${apiUrl}/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  if (response.ok) {
    const { token, user } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    dispatch(setToken(token));
    dispatch(setUser(user));
  } else {
    const msg = await response.json();
    console.log(msg);
  }
};

export const logout = userId => async (dispatch, getState) => {
  const response = await fetch(`${apiUrl}/session`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });

  if (response.ok) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    dispatch(removeToken());
    dispatch(removeUser());
  }
};
