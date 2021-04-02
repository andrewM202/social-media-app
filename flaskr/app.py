from models import db, userInformation, userPostings
from config import Config
from flask import Flask, render_template
# Flask migrate is used to connect our flask tables to our postgres database
from flask_migrate import Migrate
# SQLAlchemy is used to make our tables 
from flask_sqlalchemy import SQLAlchemy

# The function below is called the application factory function. It returns "app", our flask app, which web hosting services like Heroku can then used to deploy our app. 
def create_app(config):
    # Create our flask application object
    app = Flask(__name__)
    # Set the configurations for our flask application to the ones we specified in configs.py
    app.config.from_object('config.DevelopmentConfig')

    db.init_app(app)

    # Register Routes
    import homepage
    app.register_blueprint(homepage.bp)

    import register
    app.register_blueprint(register.bp)

    import login
    app.register_blueprint(login.bp)
    
    # return our flask application object
    return app

# run our application with debug mode on
if __name__ == "__main__":
    app.run(debug=True)
