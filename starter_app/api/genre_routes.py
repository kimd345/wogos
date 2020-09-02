from flask import Blueprint, jsonify
from starter_app.models import Genre

genre_routes = Blueprint('genres', __name__)


@genre_routes.route('/')
def index():
    res = Genre.query.all()
    return {'genres': [genre.to_dict() for genre in res]}


@genre_routes.route('/<id>')
def genre(id):
    res = Genre.query.get(id)
    return res.to_dict()


@genre_routes.route('/<id>/games')
def games(id):
    res = Genre.query.get(id)
    return {'games': [game.to_dict() for game in res.games]}
