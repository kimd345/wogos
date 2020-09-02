from flask import Blueprint, jsonify, request
from starter_app.models import Game

game_routes = Blueprint('games', __name__)


@game_routes.route('/')
def index():
    response = Game.query.limit(24)
    return {'games': [game.to_dict() for game in response]}


@game_routes.route('/<id>')
def game(id):
    response = Game.query.get(id)
    return response.to_dict()


@game_routes.route('/page/<pid>')
def games(pid):
    res = Game.query.offset((int(pid) * 24)).limit(24)
    if request.args.get('genre'):
        genres = request.args.get('genre')
        return {'games': [game.to_dict() for game in res if [genre in [g.genre.lower() for g in game.genres] for genre in genres]]}  # noqa
    if request.args.get('feature'):
        features = request.args.get('feature')
        return {'games': [game.to_dict() for game in res if [feature in [f.feature.lower() for f in game.features] for feature in features]]}  # noqa
    return {'games': [game.to_dict() for game in res]}
