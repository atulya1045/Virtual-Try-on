from flask import Flask, request
from flask_cors import CORS
import os
import deeplab.model as model

app = Flask(__name__)

CORS(app, origins=["*", "http://127.0.0.1:5000/generate_color"],
     supports_credentials=False)


@app.route('/generate_color', methods=['POST'])
def generate_color():
    try:
        color = request.json["color"]
        filename = request.json["filename"]
        output_filename = model.colorImage(filename, color)
        if output_filename:
            return output_filename
        else:
            return "fail"
    except Exception as e:
        print(e)
        return "fail"


app.run(port=5000, debug=True)
