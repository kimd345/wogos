from flask import Blueprint, jsonify, request
from starter_app.models import db, Order, Game

import datetime

order_routes = Blueprint('orders', __name__)


@order_routes.route('', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data = request.json
        user_id = data["user_id"]
        game_ids = data["game_ids"]
        datetime_obj = datetime.datetime.now()
        for game_id in game_ids:
            game = Game.query.get(game_id)
            price = float(game.to_dict()["price"])
            sale = game.to_dict()["sale"] if game.to_dict()["sale"] else 0
            discount = price * (sale / 100)
            db.session.add(Order(
                user_id=user_id,
                game_id=game_id,
                price_paid=(price - discount),
                paid_date=datetime_obj))
        db.session.commit()
        res = Order.query.filter_by(paid_date=datetime_obj).all()
        return {'order': [order.to_dict() for order in res]}
    else:
        res = Order.query.all()
        return {'orders': [order.to_dict() for order in res]}


@order_routes.route('/<id>', methods=['GET', 'DELETE'])
def order(id):
    res = Order.query.get(id)
    if request.method == 'DELETE':
        db.session.delete(res)
        db.session.commit()
    return res.to_dict()
