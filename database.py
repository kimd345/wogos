from starter_app.models import User, Order, Game, Review, Genre, Feature
from starter_app import app, db
from dotenv import load_dotenv
import requests
import random
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

    review1 = Review(user_id=1, game_id=1, title="MUST BUY", body="This is a must have game this summer", star_rating=4)  # noqa
    review2 = Review(user_id=3, game_id=2, title="meh its alright", body="i think the graphics could have been better", star_rating=2)  # noqa

    third_person = Feature(feature='Third Person Camera')
    looter_shooter = Feature(feature='Looter Shooter')
    casual = Feature(feature='Filthy Casual')

    # db.session.add(ian)
    # db.session.add(javier)
    # db.session.add(dean)
    # db.session.add(angela)
    # db.session.add(soonmi)
    # db.session.add(alissa)

    # db.session.add(order1)
    # db.session.add(order2)
    # db.session.add(order3)

    # db.session.add(game1)
    # db.session.add(game2)

    # db.session.add(review1)
    # db.session.add(review2)

    # db.session.add(fps)
    # db.session.add(rpg)
    # db.session.add(mmo)

    # db.session.add(casual)
    # db.session.add(looter_shooter)
    # db.session.add(casual)

    # db.session.commit()

    def get_games(pages):
        games = get_game_ids(pages)
        data = [(get_game_details(game['id']), game['genres'])
                for game in games]
        return [(Game(title=game[0]['title'], image_url=game[0]['image_url'], price=game[0]['price'], sale=game[0]['sale'], description=game[0]['description'], requirements=game[0]['requirements']), game[-1]) for game in data]  # noqa

    def get_game_ids(pages):
        url = 'https://api.rawg.io/api/games?dates=2015-10-10,2020-10-10&platforms=4&page_size=40&page='
        results = []
        count = 1
        while count <= pages:
            response = requests.get(url + str(count))
            games = response.json()
            results += [{'id': result['id'], 'genres': result['genres']}
                        for result in games['results']]
            count += 1
        return results

    def build_dict(item):
        req = [platform['requirements']
               for platform in item['platforms'] if platform['platform']['id'] is 4][0]  # noqa
        return {
            'title': item['name'],
            'image_url': item['background_image'],
            'description': item['description'],
            'price': 59.99,
            'sale': random.choice([None, 10, 20, 30, 50, 80]),
            'requirements': req['minimum'] if req else 'This game will run on any modern computer'
        }

    def get_genres():
        response = requests.get('https://api.rawg.io/api/genres')
        genres = response.json()
        return [Genre(genre=result['name']) for result in genres['results']]

    def get_game_details(id):
        url = 'https://api.rawg.io/api/games/'
        res = requests.get(url + str(id))
        data = res.json()
        return build_dict(data)

    def configure_genres(genres, els):
        for genre in genres:
            g = genre.to_dict()
            for el in els:
                for n in el[-1]:
                    if g['genre'] == n['name']:
                        el[0].genres.append(genre)

    game_tups = get_games(1)
    configure_genres(get_genres(), game_tups)
    games = [game[0] for game in game_tups]
    db.session.add_all(games)
    db.session.commit()
