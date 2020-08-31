from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

cart = db.Table('carts',
                db.Column('user_id', db.Integer, db.ForeignKey(
                    'users.id'), primary_key=True),
                db.Column('game_id', db.Integer, db.ForeignKey(
                    'games.id'), primary_key=True)
                )

game_genres = db.Table('games_genres',
                       db.Column('game_id', db.Integer, db.ForeignKey(
                           'games.id'), primary_key=True)
                       db.Column('genre_id', db.Integer, db.ForeignKey(
                           'genres.id'), primary_key=True)
                       )

game_features = db.Table('games_features',
                         db.Column('game_id', db.Integer, db.ForeignKey(
                             'games.id'), primary_key=True)
                         db.Column('feature_id', db.Integer, db.ForeignKey(
                             'features.id'), primary_key=True)
                         )


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    session_token = db.Column(db.String(100))

    orders = db.relationship("Order", back_populates='user')

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }


class Order(db.Models):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    price_paid = db.Column(db.Float, nullable=False)

    user = db.relationship("User", back_populates='orders')
    game = db.relationship("Game", back_populates='order')


class Game(db.Models):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    tite = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    sale = db.Column(db.Integer, nullable=True)
    description = db.Column(db.Text)
    requirements = db.Column(db.String(250))


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    title = db.Column(db.String(100), nullable=False)
    body = db.Column(db.Text, nullable=False)
    star_rating = db.Column(db.Integer, nullable=False)
    verified = db.Column(db.Boolean)


class Genre(db.Model):
    __tablename__ = 'genres'

    id = db.Column(db.Integer, primary_key=True)
    genre = db.Column(db.String(100), nullable=False)


class Feature(db.Model):
    __tablename__ = 'features'

    id = db.Column(db.Integer, primary_key=True)
    feature = db.Column(db.String(200), nullable=False)
