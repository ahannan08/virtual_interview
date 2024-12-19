from flask import Flask
from routes.api_routes import session_routes
from flask_cors import CORS

app = Flask(__name__)

# Allow CORS from your frontend's domain (e.g., React app running on localhost:3000)
CORS(app, origins=["http://localhost:3000"], methods=["GET", "POST", "PUT", "DELETE"])

# Register Routes
app.register_blueprint(session_routes, url_prefix='/api/session')

if __name__ == "__main__":
    app.run(debug=True)
