from flask import Blueprint, jsonify, request
from starter_app.models import db, Order

order_routes = Blueprint('orders', __name__)


@order_routes.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        form = request.form
        order = Order(
            user_id=form['user_id'], game_id=form['game_id'], price_paid=form['price_paid'])  # noqa
        db.session.add(order)
        db.session.commit()
        return {'order': order.to_dict()}
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
