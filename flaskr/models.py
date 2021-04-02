from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class userInformation(db.Model):
    __tablename__ = 'userinfo'

    id = db.Column(db.BigInteger, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique = True)
    password = db.Column(db.String(20), nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def __repr__(self):
        return f"{self.username}:{self.password}"

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
