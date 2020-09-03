import { apiUrl } from '../config';

export const LOAD_GAMES = 'LOAD_GAMES';

const loadGamesAction = games => ({
  type: LOAD_GAMES,
  games
})

export const loadGamesPage = (pageNum, features, genres) => async dispatch => {
  const response = await fetch(`${apiUrl}/games/page/${pageNum}${build_params(features, genres)}`);
  const res = await response.json();
  const games = {};
  res["games"].forEach(game => games[game.id] = game)
  dispatch(loadGamesAction(games))
}

const build_params = (features, genres) => {
  const feats = features.length > 0 ? features.map(el => `${encodeURIComponent(el)}`) : null
  const gens = genres.length > 0 ? genres.map(el => `${encodeURIComponent(el)}`) : null
  if (feats && gens) return `?genres=${gens.join(',')}&features=${feats.join(',')}`
  else if (feats) return `?features=${feats.join(',')}`
  else if (gens) return `?genres=${gens.join(',')}`
  else return ''
}
