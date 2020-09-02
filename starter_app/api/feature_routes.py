from flask import Blueprint, jsonify
from starter_app.models import Feature

feature_routes = Blueprint('features', __name__)


@feature_routes.route('/')
def index():
    res = Feature.query.all()
    return {'features': [feature.to_dict() for feature in res]}


@feature_routes.route('/<id>')
def feature(id):
    res = Feature.query.get(id)
    return res.to_dict()


@feature_routes.route('/<id>/games')
def games(id):
    res = Feature.query.get(id)
    return {'games': [game.to_dict() for game in res.games]}
