import os
from flask import Flask, render_template, request, session
from flask_login import LoginManager
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_jwt_extended import JWTManager

from starter_app.models import db, User
from starter_app.api.session import session
from starter_app.api.user_routes import user_routes
from starter_app.api.game_routes import game_routes
from starter_app.api.review_routes import review_routes
from starter_app.api.genre_routes import genre_routes

from starter_app.config import Config

app = Flask(__name__, static_url_path='')

jwt = JWTManager(app)

app.config.from_object(Config)
app.register_blueprint(session, url_prefix='/api/session')
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(game_routes, url_prefix='/api/games')
app.register_blueprint(review_routes, url_prefix='/api/reviews')
app.register_blueprint(genre_routes, url_prefix='/api/genres')
db.init_app(app)
login = LoginManager(app)
login.login_view = "session.login"

# Application Security
CORS(app)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get('FLASK_ENV') else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path>')
def react_root(path):
    return app.send_static_file('index.html')
