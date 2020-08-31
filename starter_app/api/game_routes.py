from flask import Blueprint, jsonify
from starter_app.models import Game

game_routes = Blueprint('games', __name__)


@game_routes.route('/')
def index():
    response = Game.query.all()
    return {'games': [game.to_dict() for game in response]}


@game_routes.route('/<id>')
def game(id):
    response = Game.query.get(id)
    return response.to_dict()
