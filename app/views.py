from flask import Blueprint, render_template
from flask_socketio import emit
from . import socketio

views = Blueprint("views", __name__)

@views.route("/")
def index():
    return render_template("index.html")

@socketio.on("play")
def handle_play():
    emit("play", broadcast=True)

@socketio.on("pause")
def handle_pause():
    emit("pause", broadcast=True)

@socketio.on("seek")
def handle_seek(data):
    emit("seek", data, broadcast=True)
