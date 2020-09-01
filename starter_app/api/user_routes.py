from flask import Blueprint, jsonify, request
from starter_app.models import User, Game

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def index():
    response = User.query.all()
    return {"users": [user.to_dict() for user in response]}


@user_routes.route('/<id>')
def user(id):
    response = User.query.get(id)
    return response.to_dict()


@user_routes.route('/<id>/cart', methods=['POST', 'DELETE'])
def add_to_cart(id):
    form = request.form
    user = User.query.get(id)
    game = Game.query.get(form['game_id'])
    if request.method == 'POST':
        user.cart_items.append(game)
        db.session.commit()
    elif request.method == 'DELETE':
        user.cart_items.remove(game)
        db.session.commit()
