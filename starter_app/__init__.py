import os
from flask import Flask, render_template, request, session
from flask_login import LoginManager
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf


from starter_app.models import db, User
from starter_app.api.user_routes import user_routes
from starter_app.api.game_routes import game_routes

from starter_app.config import Config

app = Flask(__name__, static_url_path='')

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
# app.register_blueprint(session.bp)
app.register_blueprint(game_routes, url_prefix='/api/games')
db.init_app(app)
login = LoginManager(app)
login.login_view = "session.login"


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


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
