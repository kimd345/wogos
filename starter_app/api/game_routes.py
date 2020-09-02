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
        genre = request.args.get('genre')
        if request.args.get('feature'):
            feature = request.args.get('feature')
            return {'games': [game.to_dict() for game in res if (feature in [f.feature.lower() for f in game.features] and genre in [g.genre.lower() for g in game.genres])]}  # noqa
        return {'games': [game.to_dict() for game in res if genre in [g.genre.lower() for g in game.genres]]}  # noqa
    if request.args.get('feature'):
        feature = request.args.get('feature')
        if request.args.get('genre'):
            genre = request.args.get('genre')
            return {'games': [game.to_dict() for game in res if (genre in [g.feature.lower() for g in game.genres] and feature in [f.feature.lower() for f in game.features])]}  # noqa
        return {'games': [game.to_dict() for game in res if feature in [f.feature.lower() for f in game.features]]}  # noqa
    return {'games': [game.to_dict() for game in res]}  # noqa
