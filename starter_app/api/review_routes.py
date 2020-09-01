from flask import Blueprint, jsonify
from starter_app.models import Review

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')
def index():
    res = Review.query.all()
    return {'reviews': [review.to_dict() for review in res]}


@review_routes.route('/<id>')
def review(id):
    res = Review.query.get(id)
    return res.to_dict()
