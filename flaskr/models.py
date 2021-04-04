from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, LoginManager

# create our SQLAlchemy db object that will be used to interact with our databa    se
db = SQLAlchemy()
login = LoginManager()

# Below two tables are created, userinfo and userposts. These are the same tables that will show up in postgres once migrations are completed
class userInformation(db.Model):
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
        return f"{self.username}:{self.password}"


@login.user_loader
def load_user(id):
    return UserModel.query.get(int(id))


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
