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
    # the @app.route decorator configures the URL needed before the view (the function hi is called the view) is ran. This route means that the default page when you open localhost in the browser will run this 
    @app.route('/')
    def hi():
        # render_template is used to open a specific HTML page for a route. It can also be used to send data to a form
        return render_template('index.html')
    
    # return our flask application object
    return app

# run our application with debug mode on
if __name__ == "__main__":
    app.run(debug=True)
