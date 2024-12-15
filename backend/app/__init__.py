from flask import Flask

def create_app():
    app = Flask(__name__)

    @app.route('/')
    def home():
        return "Welcome to the Virtual Interview Coach!"

    return app
