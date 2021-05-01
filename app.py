from models import db, userInformation, userPostings, login
from config import Config
from flask import Flask, render_template
# Flask migrate is used to connect our flask tables to our postgres database
from flask_migrate import Migrate
# SQLAlchemy is used to make our tables 
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, send

# Create our flask application object
app = Flask(__name__)
# Set the configurations for our flask application to the ones we specified in configs.py
app.config.from_object('config.DevelopmentConfig')

db.init_app(app)

login.init_app(app)
login.login_view = 'login'
socketio = SocketIO(app)

# Register Routes / import blueprints
import homepage
app.register_blueprint(homepage.bp)

import register
app.register_blueprint(register.bp)

import loginpage
app.register_blueprint(loginpage.bp)

import chat
app.register_blueprint(chat.bp)

# run our application with debug mode on
if __name__ == "__main__":
    socketio.run(app)

