from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

cart_items = db.Table('carts',
                      db.Column('user_id', db.Integer, db.ForeignKey(
                          'users.id'), primary_key=True),
                      db.Column('game_id', db.Integer, db.ForeignKey(
                          'games.id'), primary_key=True)
                      )

genres = db.Table('games_genres',
                  db.Column('game_id', db.Integer, db.ForeignKey(
                      'games.id'), primary_key=True),
                  db.Column('genre_id', db.Integer, db.ForeignKey(
                      'genres.id'), primary_key=True)
                  )

features = db.Table('games_features',
                    db.Column('game_id', db.Integer, db.ForeignKey(
                        'games.id'), primary_key=True),
                    db.Column('feature_id', db.Integer, db.ForeignKey(
                        'features.id'), primary_key=True)
                    )


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(100), nullable=False)
    session_token = db.Column(db.String(100))

    orders = db.relationship("Order", backref='user')
    reviews = db.relationship('Review', backref='user')
    cart_items = db.relationship('Game', secondary=cart_items, lazy='subquery',
                                 backref=db.backref('users', lazy=True))

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "orders": [order.to_dict() for order in self.orders],
            "reviews": [review.to_dict() for review in self.reviews],  # noqa
            "cart_items": [game.to_dict() for game in self.cart_items]
        }


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    price_paid = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "game_id": self.game_id,
            "price_paid": self.price_paid
        }


class Game(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    sale = db.Column(db.Integer, nullable=True)
    description = db.Column(db.Text)
    requirements = db.Column(db.String(250))

    orders = db.relationship('Order', backref='game')
    reviews = db.relationship('Review', backref='game')

    genres = db.relationship('Genre', secondary=genres, lazy='subquery',
                             backref=db.backref('games', lazy=True))
    features = db.relationship('Feature', secondary=features, lazy='subquery',
                               backref=db.backref('games', lazy=True))

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "price": self.check_sale(),
            "sale": self.sale,
            "description": self.description,
            "requirements": self.requirements,
            "genres": [genre.to_dict() for genre in self.genres],
            "features": [feature.to_dict() for feature in self.features],
            "orders": [order.to_dict() for order in self.orders],
            "reviews": [review.to_dict() for review in self.reviews]
        }

    def check_sale(self):
        price = self.price if self.sale is None \
            else self.price * (self.sale / 100)
        return price


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    title = db.Column(db.String(100), nullable=False)
    body = db.Column(db.Text, nullable=False)
    star_rating = db.Column(db.Integer, nullable=False)
    verified = db.Column(db.Boolean)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "game_id": self.game_id,
            "title": self.title,
            "body": self.body,
            "star_rating": self.star_rating,
            "verified": self.verified
        }


class Genre(db.Model):
    __tablename__ = 'genres'

    id = db.Column(db.Integer, primary_key=True)
    genre = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "genre": self.genre
        }


class Feature(db.Model):
    __tablename__ = 'features'

    id = db.Column(db.Integer, primary_key=True)
    feature = db.Column(db.String(200), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "feature": self.feature
        }


    @property
    def password(self):
        return self.hashed_password


    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password, password)
