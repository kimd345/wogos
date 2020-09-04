from werkzeug.security import generate_password_hash
from starter_app.models import User, Order, Game, Review, Genre, Feature
from bs4 import BeautifulSoup
from starter_app import app, db
from dotenv import load_dotenv
import requests
import random
load_dotenv()

with app.app_context():
    db.drop_all()
    db.create_all()

    ian = User(username='Ian', email='ian@aa.io',
               hashed_password=generate_password_hash('password'))
    javier = User(username='Javier', email='javier@aa.io',
                  hashed_password=generate_password_hash('password'))
    dean = User(username='Dean', email='dean@aa.io',
                hashed_password=generate_password_hash('password'))
    angela = User(username='Angela', email='angela@aa.io',
                  hashed_password=generate_password_hash('password'))
    soonmi = User(username='Soon-Mi', email='soonmi@aa.io',
                  hashed_password=generate_password_hash('password'))
    alissa = User(username='Alissa', email='alissa@aa.io',
                  hashed_password=generate_password_hash('password'))

    db.session.add(ian)
    db.session.add(javier)
    db.session.add(dean)
    db.session.add(angela)
    db.session.add(soonmi)
    db.session.add(alissa)

    def get_games(pages):
        games = get_game_ids(pages)
        data = [(get_game_details(game['id']), game['tags'], game['genres'])
                for game in games]
        return [(Game(title=game[0]['title'], image_url=game[0]['image_url'], video_url=game[0]['video_url'], price=game[0]['price'], sale=game[0]['sale'], description=game[0]['description'], requirements=game[0]['requirements']), game[1], game[-1]) for game in data]  # noqa

    def get_game_ids(pages):
        url = 'https://api.rawg.io/api/games?dates=2015-10-10,2020-10-10&platforms=4&page_size=40&page='  # noqa
        results = []
        count = 1
        while count <= pages:
            response = requests.get(url + str(count))
            games = response.json()
            results += [{'id': result['id'],
                         'genres': result['genres'],
                         'tags': result['tags']}
                        for result in games['results']]
            count += 1
        return results

    def build_dict(item):
        req = [platform['requirements']
               for platform in item['platforms'] if platform['platform']['id'] is 4][0]  # noqa
        desc = BeautifulSoup(item['description'], 'html.parser')
        req = req['minimum'] if req else 'This game will run on any modern computer'  # noqa
        req_soup = BeautifulSoup(req, 'html.parser')
        return {
            'title': item['name'],
            'image_url': item['background_image'],
            'video_url': item['video_url'],
            'description': desc.get_text(),
            'price': 59.99,
            'sale': random.choice([None, 10, 20, 30, 50, 80]),
            'requirements':  req_soup.get_text()
        }

    def get_features():
        res = requests.get('https://api.rawg.io/api/tags')
        features = res.json()
        return [Feature(feature=result['name'].lower()) for result in features['results']]  # noqa

    def get_genres():
        response = requests.get('https://api.rawg.io/api/genres')
        genres = response.json()
        return [Genre(genre=result['name'].lower()) for result in genres['results']]  # noqa

    def get_video(id):
        res = requests.get(f'https://api.rawg.io/api/games/{id}/movies')
        data = res.json()
        return data

    def get_game_details(id):
        url = 'https://api.rawg.io/api/games/'
        vid_load = get_video(id)
        vid = vid_load['results'][0]['data'] if vid_load['results'] else None
        res = requests.get(url + str(id))
        data = res.json()
        data['video_url'] = vid['480'] if vid else None
        return build_dict(data)

    def configure_features(features, els):
        for feature in features:
            feat = feature.to_dict()
            for el in els:
                for n in el[1]:
                    if feat['feature'] == n['name'].lower():
                        el[0].features.append(feature)

    def configure_genres(genres, els):
        for genre in genres:
            g = genre.to_dict()
            for el in els:
                for n in el[-1]:
                    if g['genre'] == n['name'].lower():
                        el[0].genres.append(genre)

    game_tups = get_games(10)
    configure_genres(get_genres(), game_tups)
    configure_features(get_features(), game_tups)
    games = [game[0] for game in game_tups]
    db.session.add_all(games)
    db.session.commit()
