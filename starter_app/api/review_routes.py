from flask import Blueprint, jsonify, request
from starter_app.models import db, Review

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        form = request.form
        review = Review(user_id=form['user_id'], game_id=form['game_id'], title=form['title'], body=form['body'], star_rating=form['star_rating'])  # noqa
        db.session.add(review)
        db.session.commit()
        return {'review': review.to_dict()}
    else:
        res = Review.query.all()
        return {'reviews': [review.to_dict() for review in res]}


@review_routes.route('/<id>', methods=['GET', 'DELETE'])
def review(id):
    res = Review.query.get(id)
    if request.method == 'DELETE':
        db.session.delete(res)
    return res.to_dict()
