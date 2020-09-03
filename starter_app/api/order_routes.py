from flask import Blueprint, jsonify, request
from starter_app.models import db, Order, Game

import datetime
import uuid

order_routes = Blueprint('orders', __name__)


@order_routes.route('', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        order_id = uuid.uuid4();
        order_list = []
        data = request.json
        user_id = data["user_id"]
        game_ids = data["game_ids"]
        datetime_obj = datetime.datetime.now()
        for game_id in game_ids:
            game = Game.query.get(game_id)
            price = game.check_sale();
            order_list.append({
                "id": game.id,
                "title": game.title,
                "image_url": game.image_url,
            })
            db.session.add(Order(
                user_id=user_id,
                game_id=game_id,
                price_paid=price,
                paid_date=datetime_obj))
        db.session.commit()
        return {'order_id': order_id,'order_items': [item for item in order_list]}
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
