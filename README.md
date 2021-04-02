# Social-Media-App

A social media application created using Flask/Python, postgreSQL and SQLAlchemy, HTML, CSS, and JavaScript. 
Functionality includes:

# To Run/Setup The Application Locally 
NOTE: postgres/pgadmin4 must be downloaded and running
```sh
    $ brew install postgres
    $ brew services start postgres
```

1. Create and activate the virtual environment
```sh
    $ python3 -m venv venv
    $ source venv/bin/activate
```

2. Install the dependencies
```sh
    $ python3 -r requirements.txt
```

3. Run the following exports
```sh
    $ export DATABASE_URL="postgresql:///socialmediaapp"
    $ export FLASK_APP=social-media-app
    $ export FLASK_ENV=development
    $ export APP_SETTINGS="config.DevelopmentConfig"
```

4. Create the postgres database and roles by running the following shell script
```sh
    $ sh bin/create-db.sh
```

5. Create and connect the SQLAlchemy tables to the newly created postgres database
```sh
    $ cd flaskr
    $ python manage.py db init (NOTE: migrations folder pushed to GitHub already, this step may be unneccessary) 
    $ python manage.py db migrate
    $ python manage.py db upgrade
```

6. Run the application while inside the flaskr directory. Then open the live application at http://127.0.0.1:5000/
```sh
    $ flask run
```

# Screenshots of Website Below
