from starter_app.models import User, Order, Game, Review, Genre, Feature
from starter_app import app, db
from dotenv import load_dotenv
load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

    ian = User(username='Ian', email='ian@aa.io',
               hashed_password='auhgdfiaufhggasrgargarg')
    javier = User(username='Javier', email='javier@aa.io',
                  hashed_password='auhgdfiaufhggasrgargarg')
    dean = User(username='Dean', email='dean@aa.io',
                hashed_password='auhgdfiaufhggasrgargarg')
    angela = User(username='Angela', email='angela@aa.io',
                  hashed_password='auhgdfiaufhggasrgargarg')
    soonmi = User(username='Soon-Mi', email='soonmi@aa.io',
                  hashed_password='auhgdfiaufhggasrgargarg')
    alissa = User(username='Alissa', email='alissa@aa.io',
                  hashed_password='auhgdfiaufhggasrgargarg')

    order1 = Order(user_id=1, game_id=1, price_paid=19.99)
    order2 = Order(user_id=2, game_id=1, price_paid=19.99)
    order3 = Order(user_id=3, game_id=2, price_paid=59.99)

    game1 = Game(title="blahs adventure", price=19.99, description="this game is trash", requirements='a super dope pc')  # noqa
    game2 = Game(title="blash second adventure", price=59.99, description="the devs actually game through on this one", requirements='1080 TI')  # noqa

    review1 = Review(user_id=1, game_id=1, title="MUST BUY", body="This is a must have game this summer", star_rating=4)  # noqa
    review2 = Review(user_id=3, game_id=2, title="meh its alright", body="i think the graphics could have been better", star_rating=2)  # noqa

    fps = Genre(genre='First Person Shooter')
    rpg = Genre(genre='Role Playing Game')
    mmo = Genre(genre='Massive Multiplayer Online')

    third_person = Feature(feature='Third Person Camera')
    looter_shooter = Feature(feature='Looter Shooter')
    casual = Feature(feature='Filthy Casual')

    db.session.add(ian)
    db.session.add(javier)
    db.session.add(dean)
    db.session.add(angela)
    db.session.add(soonmi)
    db.session.add(alissa)

    db.session.add(order1)
    db.session.add(order2)
    db.session.add(order3)

    db.session.add(game1)
    db.session.add(game2)

    db.session.add(review1)
    db.session.add(review2)

    db.session.add(fps)
    db.session.add(rpg)
    db.session.add(mmo)

    db.session.add(casual)
    db.session.add(looter_shooter)
    db.session.add(casual)

    db.session.commit()
