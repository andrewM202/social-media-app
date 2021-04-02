from models import db, userInformation, userPostings
from config import Config
from flask import Flask, render_template
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

def create_app(config):
    app = Flask(__name__)
    app.config.from_object('config.DevelopmentConfig')
    db = SQLAlchemy(app)

    @app.route('/')
    def hi():
        return render_template('index.html')
    
    return app

if __name__ == "__main__":
    app.run(debug=True)
