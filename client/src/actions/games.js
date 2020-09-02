import { apiUrl } from '../config';

export const LOAD_GAMES = 'LOAD_GAMES';

const loadGamesAction = games => ({
  type: LOAD_GAMES,
  games
})


export const loadDefaultGames = () => async dispatch => {
  const response = await fetch(`${apiUrl}/games/`);
  const res = await response.json();
  const games = {};
  res["games"].forEach(game => games[game.id] = game)
  dispatch(loadGamesAction(games))
}

export const loadGamesPage = (pageNum) => async dispatch => {
  const response = await fetch(`${apiUrl}/games/page/${pageNum}`);
  const res = await response.json();
  const games = {};
  res["games"].forEach(game => games[game.id] = game)
  dispatch(loadGamesAction(games))
}
