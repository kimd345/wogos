import {
  LOAD_GAMES
} from '../actions/games'

const gamesReducer = (state = { current_games: {} }, action) => {
  switch (action.type) {
    case LOAD_GAMES: {
      return {
        ...state,
        current_games: action.games
      }
    }

    default: return state;
  }
}

export default gamesReducer;
