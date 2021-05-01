from flask import Blueprint, request, Flask, render_template, redirect
from flask_login import current_user
from flask_socketio import SocketIO, send 
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


    if current_user.is_authenticated:
        return render_template("chat.html")
    
    return redirect("/")

@socketio.on("message", namespace="/broadcast-message")
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

    newest_user = latest_user.first()[0]

    message_details = {"user": newest_user, "message": msg}
    send(message_details,  broadcast=True)
    #send(msg, latest_user, broadcast=True)

@socketio.on("username-session-id", namespace="/private-message")
def receieve_username():
    # have it retrieve the username with the .last() session id that is the same as the current logged in user
    print('hi')





