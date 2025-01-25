from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import pandas as pd

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB connection
client = MongoClient(os.getenv('MONGODB_URI'))
db = client[os.getenv('DATABASE_NAME')]

@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        # Get data from MongoDB collection
        collection = db.your_collection_name
        data = list(collection.find({}, {'_id': 0}))  # Exclude MongoDB _id field
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/data', methods=['POST'])
def add_data():
    try:
        data = request.json
        collection = db.your_collection_name
        result = collection.insert_one(data)
        return jsonify({'message': 'Data added successfully', 'id': str(result.inserted_id)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 