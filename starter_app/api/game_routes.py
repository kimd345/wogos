from flask import Blueprint, jsonify, request
from starter_app.models import Game, Genre, Feature

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
def games_by_page(pid):
    if request.args.get('genres') and request.args.get('features'):
        genres = request.args.get('genres').split(',')
        features = request.args.get('features').split(',')
        res = Game.query.filter(Game.genres.any(
            Genre.genre.in_(genres)) & Game.features.any(
            Feature.feature.in_(features))).offset((int(pid) * 24)).limit(24)  # noqa
    else:
        if request.args.get('genres'):
            genres = request.args.get('genres').split(',')
            res = Game.query.filter(Game.genres.any(
                Genre.genre.in_(genres))).offset((int(pid) * 24)).limit(24)  # noqa
        if request.args.get('features'):
            features = request.args.get('features').split(',')
            res = Game.query.filter(Game.features.any(
                Feature.feature.in_(features))).offset((int(pid) * 24)).limit(24)  # noqa
        else:
            res = Game.query.offset((int(pid) * 24)).limit(24)
    return {'games': [game.to_dict() for game in res]}


@game_routes.route('/search/<query>')
def search_results():
    print('HITTING THIS ROUTE')
    res = Game.query.filter(Game.title.any(
        
    ))
    return jsonify({"msg": "HITTING THIS ROUTE 2"}), 200
