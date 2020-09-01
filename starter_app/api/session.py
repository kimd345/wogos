from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
  jwt_required, create_access_token, get_jwt_identity
)
from flask_login import current_user, login_user, logout_user

from starter_app.models import User

session = Blueprint('session', __name__)

@session.route('', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)
    print("EEEEMMMAAAAAIIIIL: ", email)
    if not email:
        return jsonify({"msg": "Missing email"}), 400
    if not password:
        return jsonify({"msg": "Missing password"}), 400
    print("2 EEEEMMMAAAAAIIIIL: ", email)

    user = User.query.filter(User.email == email).first()
    if not user or not user.check_password(password):
        return jsonify({"msg": "Missing password"}), 401

    # login_user(user)
    access_token = create_access_token(identity=email)
    print("ACCCESSSS TOOKEENNNN: ", access_token)
    user.session_token = access_token
    user_dict = {
      'id': user.id,
      'username': user.username,
      'email': user.email,
      'hashed_password': user.hashed_password,
      'session_token': user.session_token,
      }
    return jsonify({'user': user_dict, 'token': access_token}), 200
