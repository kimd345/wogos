from flask import Blueprint, jsonify, request
from starter_app.models import db, User, Game

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def index():
    response = User.query.all()
    return {"users": [user.to_dict() for user in response]}


@user_routes.route('/<id>')
def user(id):
    response = User.query.get(id)
    return response.to_dict()


@user_routes.route('/<id>/cart', methods=['GET', 'POST', 'DELETE'])
def cart(id):
    user = User.query.get(id)
    if request.method == 'GET':
        return {'games': [{'id': game.id, 'image_url': game.image_url, 'title': game.title, 'price': game.check_sale(), 'sale': game.sale} for game in user.cart_items]}  # noqa
    else:
        form = request.json
        game = Game.query.get(form['game_id'])
        if request.method == 'POST':
            user.cart_items.append(game)
            db.session.commit()
            return game.to_dict()
        elif request.method == 'DELETE':
            user.cart_items.remove(game)
            db.session.commit()
            return game.to_dict()
