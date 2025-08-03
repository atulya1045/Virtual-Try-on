from flask import Flask, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import os
from api.users import routes as user_routes

load_dotenv()

app = Flask(__name__)

CORS(app, origins=["*"], supports_credentials=True)


@app.route('/')
def index():
    return render_template('index.html')


app.register_blueprint(user_routes.users_bp, url_prefix='/api/v1/users')

app.run(port=os.environ["PORT"], debug=True)
