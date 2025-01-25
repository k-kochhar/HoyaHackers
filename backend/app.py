from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from bson import ObjectId

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB connection
client = MongoClient(os.getenv('MONGODB_URI'))
db = client[os.getenv('DATABASE_NAME')]
resumes_collection = db.data
  # assuming your collection is named 'resumes'

@app.route('/api/resumes', methods=['GET'])
def get_resumes():
    try:
        # Get pagination parameters from query string
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 5))
        
        # Calculate skip and limit
        skip = (page - 1) * per_page
        
        # Get total count
        total_resumes = resumes_collection.count_documents({})
        
        # Get paginated resumes
        resumes = list(resumes_collection.find().skip(skip).limit(per_page))
        
        # Convert ObjectId to string for JSON serialization
        for resume in resumes:
            resume['_id'] = str(resume['_id'])
        
        return jsonify({
            'resumes': resumes,
            'total': total_resumes,
            'page': page,
            'per_page': per_page,
            'total_pages': (total_resumes + per_page - 1) // per_page
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/resumes/<status>', methods=['GET'])
def get_resumes_by_status(status):
    try:
        # Get pagination parameters
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 5))
        
        # Calculate skip
        skip = (page - 1) * per_page
        
        # Get total count for this status
        total_resumes = resumes_collection.count_documents({'status': status})
        
        # Get filtered and paginated resumes
        resumes = list(resumes_collection.find({'status': status}).skip(skip).limit(per_page))
        
        # Convert ObjectId to string
        for resume in resumes:
            resume['_id'] = str(resume['_id'])
        
        return jsonify({
            'resumes': resumes,
            'total': total_resumes,
            'page': page,
            'per_page': per_page,
            'total_pages': (total_resumes + per_page - 1) // per_page
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/resume/<id>', methods=['GET'])
def get_resume(id):
    try:
        # Get a specific resume by ID
        resume = resumes_collection.find_one({'_id': ObjectId(id)})
        if resume:
            resume['_id'] = str(resume['_id'])
            return jsonify(resume)
        return jsonify({'error': 'Resume not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/resume/<id>/update-status', methods=['PUT'])
def update_resume_status(id):
    try:
        data = request.json
        new_status = data.get('status')
        
        if not new_status:
            return jsonify({'error': 'Status is required'}), 400
            
        result = resumes_collection.update_one(
            {'_id': ObjectId(id)},
            {'$set': {'status': new_status}}
        )
        
        if result.modified_count:
            return jsonify({'message': 'Status updated successfully'})
        return jsonify({'error': 'Resume not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Welcome to the Hireflow API'})

if __name__ == '__main__':
    app.run(debug=True, port=3001) 