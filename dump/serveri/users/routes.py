from flask import Blueprint, request, jsonify
from bson import json_util
import json
from database import database
import uuid
from datetime import datetime

mongoClient = database.get_database()

users_bp = Blueprint(
    'users_bp', __name__,
)


@users_bp.route('/signup', methods=["POST"])
def signUpUser():
    try:
        username = request.json["name"]
        password = request.json["password"]
        email = request.json["email"]
        print(username)
        user = {
            'username': username,
            'password': password,
            'email': email
        }

        res = mongoClient["users"].insert_one(user)
        print(res.acknowledged)
        return jsonify({'message': json.loads(json_util.dumps(user)), 'status': 200})

    except Exception as Argument:
        print(Argument)
        return Argument
    # return "hi"


@users_bp.route('', methods=["GET"])
def getUser():
    try:
        username = request.args.to_dict()["username"]
        user = mongoClient["users"].find_one({'username': username})
        print(json.loads(json_util.dumps(user)))
        return {'user': json.loads(json_util.dumps(user)), 'message': 'sucess', 'status': 200}

    except Exception as Argument:
        print(Argument)
        return Argument


@users_bp.route('/login', methods=["POST"])
def loginUser():
    try:
        username = request.json["username"]
        password = request.json["password"]

        user = mongoClient["users"].find_one({
            'username': username,
            'password': password,
        })

        return {'user': json.loads(json_util.dumps(user)), 'message': 'sucess', 'status': 200}

    except Exception as Argument:
        print(Argument)
        return Argument


@users_bp.route('/orignalImage', methods=["POST"])
def addOrgImage():
    try:
        f = request.files['file']
        username = request.json["username"]
        fileName = uuid.uuid1()
        now = datetime.now()
        f.save(fileName)

        image = {
            'time': now,
            'name': fileName,
            'username': username
        }

        image = mongoClient["org_images"].insert_one(image)

        return {'message': json.loads(json_util.dumps(image)), 'status': 200}

    except Exception as Argument:
        print(Argument)
        return Argument
