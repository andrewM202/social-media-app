import os
# basedir is set as a relative path from any place we call it to this file
basedir = os.path.abspath(os.path.dirname(__file__))

# Below I create a classes with the configuration settings for all the stages of my product. Config is the default config, ProductionConfig for production, etc.
class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = 'this-really-needs-to-be-changed'
    # SQLALCHEMY_DATABASE_URI sets the app to use the newly created database
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SEND_FILE_MAX_AGE_DEFAULT makes it so the browser doesn't store any of the CSS or HTML in a cache. It makes for easier development
    SEND_FILE_MAX_AGE_DEFAULT = 0


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True


