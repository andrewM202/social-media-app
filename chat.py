from flask import Blueprint, request, Flask, render_template, redirect
from flask_login import current_user
from flask_socketio import SocketIO, send, emit 
from models import db, userInformation, userPostings, login
from app import socketio
import datetime
from sqlalchemy import text, create_engine
import os

db_string = os.environ.get('DATABASE_URL')
db = create_engine(db_string)

bp = Blueprint("chatpage", __name__)

@bp.route("/chat", methods = ["POST", "GET"])
def chatfunction():
    """ Chat route for social media app """

    # see if user received room connection message already
    previously_joined = db.execute(f"""
        SELECT posts
        FROM userposts
        WHERE posts = '{current_user} has joined the room!'
    """).fetchone()

    if current_user.is_authenticated:
        if previously_joined == None:
            return render_template("chat.html", previously_joined=False)
        else:
            return render_template("chat.html", previously_joined=True)
    
    return redirect("/")

# on connecting to broadcast message, load last x amount of messages
@socketio.on("connect")
def test_connect():
    """ stuff here eventually """


@socketio.on("load_messages")
def load_messages():
    # query the last 50 messages
    last_messages = db.execute(f"""
        SELECT posts
        FROM userposts
        ORDER BY postid DESC
        LIMIT 250
    """).fetchall()

    last_users = db.execute(f"""
        SELECT username
        FROM userposts
        ORDER BY postid DESC
        LIMIT 250
    """).fetchall()

    last_postids = db.execute(f"""
        SELECT postid
        FROM userposts
        ORDER BY postid DESC
        LIMIT 250
    """).fetchall()

    last_postdates = db.execute(f"""
        SELECT postdate
        FROM userposts
        ORDER BY postid DESC
        LIMIT 250
    """).fetchall()

    # create a message log to hold messages and user who posted them
    message_log = []

    for row in range(0, len(last_messages)):
        # append last x amount of  messages and users as dictionaries into message_log
        message_log.append({"user": last_users[row][0], "message": last_messages[row][0], "postid": last_postids[row][0], "postdate": str(last_postdates[row][0])[0:5] })

    # send the message log!
    emit('load messages', message_log, broadcast=False)

@socketio.on("delete_message")
def delete_message(msg_details):
    # msg_details contains {"username": username, "message": message}
    db.execute(f"""
        DELETE
        FROM userposts
        WHERE postid = '{msg_details.get("postid")}'
    """)

    other_users_delete = msg_details.get("postid")
    emit('delete message', other_users_delete, broadcast=True)
    

@socketio.on("message")
def handle_broadcast_message(msg):
    # note: session IDs change each time the user connects to the socket
    # session IDs are only used to identify each time a user connects to the socket

    # add the user post to the database
    if len(msg) > 0:
        db.execute(f"""
        INSERT INTO userposts (username, posts, sessionid) 
        VALUES ('{current_user.username}', '{msg}', '{request.sid}')
    """)

    latest_user = db.execute(f"""
        SELECT username 
        FROM userposts 
        ORDER BY postid DESC
        LIMIT 1
    """)

    latest_post_date = db.execute(f"""
        SELECT postdate
        FROM userposts
        ORDER BY postid DESC
        LIMIT 1
    """)

    newest_user = latest_user.first()[0]
    newest_postdate = str(latest_post_date.first()[0])[0:5]

    message_details = {"user": newest_user, "message": msg, "postdate": newest_postdate}
    send(message_details, broadcast=True)

