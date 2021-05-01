# This file will be used to run migrations for our tables. Essentially, it will connect our SQLAlchemy tables in models.py to the socialmediaapp database we created in postgres

import os
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from app import app
# import our database object so we can run migrations to our postgres db
from models import db
# import the default config we setup in configs.py
from config import Config


app.config.from_object(os.environ['APP_SETTINGS'])

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()

