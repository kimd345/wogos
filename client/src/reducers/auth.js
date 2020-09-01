import {
  SET_TOKEN,
  REMOVE_TOKEN,
  SET_USER,
} from '../actions/auth';

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }

    case REMOVE_TOKEN: {
      const nextState = { ...state };
      delete nextState.token;
      return nextState;
    }

    case SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }

    default: return state;
  }
}

export default authReducer;