from flask import Blueprint
from flask_login import current_user, login_user, logout_user

from starter_app.models import User

session = Blueprint('session', __name__)


@session.route('', methods=['POST'])
def login():
    print('HEEEELLLOOOOO')
    return {
      'error': 'not yet implemented'
    }
