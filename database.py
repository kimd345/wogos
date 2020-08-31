from starter_app.models import User
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

    db.session.add(ian)
    db.session.add(javier)
    db.session.add(dean)
    db.session.add(angela)
    db.session.add(soonmi)
    db.session.add(alissa)

    db.session.commit()
