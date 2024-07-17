from flask import Flask
from flask_socketio import SocketIO

socketio = SocketIO(async_mode='eventlet')

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "secret"

    from .views import views
    app.register_blueprint(views)

    socketio.init_app(app, cors_allowed_origins="*")

    return app
