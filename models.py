from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, LoginManager
import flask_security
from sqlalchemy import create_engine
# import python libraries for strings and random string generator
import string
import random

# create our SQLAlchemy db object that will be used to interact with our databa    se
db = SQLAlchemy()
login = LoginManager()

# define variables to use imported module methods
letters = string.ascii_letters
digits = string.digits

# function to return randomly generated string
def salt():
    return ''.join(random.choice(letters + digits) for i in range(20))

# Below two tables are created, userinfo and userposts. These are the same tables that will show up in postgres once migrations are completed
class userInformation(db.Model, UserMixin):
    __tablename__ = 'userinfo'

    id = db.Column(db.BigInteger, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique = True)
    password_salt_hash = db.Column(db.String(500), nullable=False)
    salt_key = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique = True)

    def __init__(self, username, email):
        self.salt_key = salt()
        self.username = username
        self.email = email

    def set_password(self, password):
        salted_password = password + self.salt_key
        self.password_salt_hash = generate_password_hash(salted_password)

    def check_password(self, password):
        password = password + self.salt_key
        return check_password_hash(self.password_salt_hash, password)

    def __repr__(self):
        return f"{self.username}:{self.password}"


@login.user_loader
def load_user(id):
    return userInformation.query.get(int(id))


class userPostings(db.Model):
    __tablename__ = 'userposts'

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.BigInteger, db.ForeignKey("userinfo.id"))
    posts = db.Column(db.String(5000))
    postdate = db.Column(db.DateTime())

    def __init__(self, posts, postdate):
        self.posts = posts
        self.postdate = postdate

    def __repr__(self):
        return f"{self.posts}:{self.postdate}"
