from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, LoginManager
import datetime
from sqlalchemy.sql import func

# create our SQLAlchemy db object that will be used to interact with our databa    se
db = SQLAlchemy()
login = LoginManager()

# Below two tables are created, userinfo and userposts. These are the same tables that will show up in postgres once migrations are completed
class userInformation(db.Model, UserMixin):
    __tablename__ = 'userinfo'

    id = db.Column(db.BigInteger, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique = True)
    password_hash = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique = True)

    def __init__(self, username, email):
        self.username = username
        self.email = email

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"{self.username}"


@login.user_loader
def load_user(id):
    return userInformation.query.get(int(id))


class userPostings(db.Model):
    __tablename__ = 'userposts'

    # each post will have an id so we can uniquely identify each post
    postid = db.Column(db.BigInteger, primary_key=True)
    # get userid so we can connect each post to the user
    username = db.Column(db.String(20), nullable=False)
    # store the actual post itself
    posts = db.Column(db.String(5000))
    # get the post's date so we can know when the post was made
    postdate = db.Column(db.DateTime(timezone=True), server_default=func.now())
    # connect the session id to the user id
    sessionid = db.Column(db.String(300))

    def __init__(self, posts, sessionid, username):
        self.username = username
        self.posts = posts
        self.sessionid = sessionid

    def __repr__(self):
        return f"{self.posts}:{self.postdate}"

