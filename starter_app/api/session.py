from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
  jwt_required, create_access_token, get_jwt_identity
)
from flask_login import current_user, login_user, logout_user

from starter_app.models import db, User

session = Blueprint('session', __name__)

# @session.route('', methods=['PUT'])
# def login():
#     if not request.is_json:
#         return jsonify({"msg": "Missing JSON in request"}), 400

#     email = request.json.get('email', None)
#     password = request.json.get('password', None)

#     if not email:
#         return jsonify({"msg": "Missing email"}), 400
#     if not password:
#         return jsonify({"msg": "Missing password"}), 400

#     user = User.query.filter(User.email == email).first()
#     if not user or not user.check_password(password):
#         return jsonify({"msg": "Missing password"}), 401

#     access_token = create_access_token(identity=email)
#     user.session_token = access_token
#     user_dict = {
#       'id': user.id,
#       'username': user.username,
#       'email': user.email,
#       'hashed_password': user.hashed_password,
#       'session_token': user.session_token,
#       }
#     return jsonify({'user': user_dict, 'token': access_token}), 200

@session.route('', methods=['PUT', 'POST'])
def auth():
    # if request.method == 'DELETE':

    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email:
        return jsonify({"msg": "Missing email"}), 400
    if not password:
        return jsonify({"msg": "Missing password"}), 400

    if request.method == 'POST':
        username = request.json.get('username', None)
        if not username:
            return jsonify({"msg": "Missing username"}), 400

    if request.method == 'PUT':
        user = User.query.filter(User.email == email).first()
        if not user or not user.check_password(password):
            return jsonify({"msg": "Missing password"}), 401
    elif request.method == 'POST':
        user = User(username=username, email=email)
        user.password = password
        db.session.add(user)
        db.session.commit()

    access_token = create_access_token(identity=email)
    user.session_token = access_token
    user_dict = {
      'id': user.id,
      'username': user.username,
      'email': user.email,
      'hashed_password': user.hashed_password,
      'session_token': user.session_token,
      }
    return jsonify({'user': user_dict, 'token': access_token}), 200