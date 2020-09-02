from flask import Blueprint, jsonify
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
    return {'games': [game.to_dict() for game in res]}
