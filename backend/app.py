from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from bson import ObjectId
import subprocess
import json

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB connection
client = MongoClient(os.getenv('MONGODB_URI'))
db = client[os.getenv('DATABASE_NAME')]
resumes_collection = db.data
jobs_collection = db.job_information

# Initialize default job if it doesn't exist
default_job = {
    "job_title": "Software Engineer I",
    "job_description": """
# Software Engineer I  
**Location:** Atlanta, GA (Hybrid)  
**Company:** Coca-Cola  

## About the Position  
Coca-Cola is seeking **recent CS graduates** or individuals with equivalent experience to join our **Digital Solutions** team as a **Software Engineer I**. This role focuses on **full-stack development** using **React**, **Node.js**, and **AWS**.  

---

## Key Responsibilities  
- Develop and maintain scalable APIs  
- Ensure efficient and clean code maintenance  
- Provide production support for deployed applications  

---

## Required Skills  
- Proficiency in **JavaScript/TypeScript**  
- Experience with **React**  
- Basic knowledge of **SQL**  
- Familiarity with **Git**  

---

## What We Offer  
- **Competitive Salary:** $75k-$95k  
- **Comprehensive Benefits:**  
  - 401(k) with **6% match**  
  - 20 days **PTO**  
  - **Unlimited beverages**  
- Growth opportunities:  
  - Mentorship programs  
  - Technical training  
  - Exposure to **global projects**  

---

## How to Apply  
Submit your **resume**, **cover letter**, and **portfolio** (if available) at [careers.coca-cola.com](https://careers.coca-cola.com).  
**Reference Code:** SWE-I-2025-ATL
"""
}

# Check if default job exists, if not create it
if jobs_collection.count_documents({}) == 0:
    jobs_collection.insert_one(default_job)

@app.route('/api/resumes', methods=['GET'])
def get_resumes():
    try:
        # Get pagination parameters from query string
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 5))
        
        # Get search and filter parameters
        search_query = request.args.get('search', '').strip()
        status = request.args.get('status')
        min_score = request.args.get('min_score')
        min_gpa = request.args.get('min_gpa')
        phone_screen = request.args.get('phone_screen')
        
        # Build filter query
        filter_query = {}
        
        # Add search query if provided
        if search_query:
            filter_query['name'] = {'$regex': search_query, '$options': 'i'}
            
        if status:
            filter_query['status'] = status
        if min_score:
            filter_query['initial_score'] = {'$gte': float(min_score)}
        if min_gpa:
            filter_query['gpa'] = {'$gte': float(min_gpa)}
        if phone_screen:
            filter_query['phone_screen'] = phone_screen
        
        # Calculate skip and limit
        skip = (page - 1) * per_page
        
        # Get total count with filters
        total_resumes = resumes_collection.count_documents(filter_query)
        
        # Get filtered and paginated resumes
        resumes = list(resumes_collection.find(filter_query).skip(skip).limit(per_page))
        
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
    
@app.route('/api/resume', methods=['POST'])
def create_resume():
    try:
        data = request.json
        required_fields = ['name', 'education', 'graduation_year', 'yoe', 'gpa', 'email', 'phone']
        
        # Validate required fields
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Set default values for optional fields
        data['initial_score'] = data.get('initial_score', 0)
        data['secondary_score'] = data.get('secondary_score', 0)
        data['status'] = data.get('status', 'new')
        data['phone_screen'] = data.get('phone_screen', 'not completed')
        data['notes'] = data.get('notes', '')
        
        # Insert the document
        result = resumes_collection.insert_one(data)
        
        # Return the created document
        created_resume = resumes_collection.find_one({'_id': result.inserted_id})
        created_resume['_id'] = str(created_resume['_id'])
        
        return jsonify(created_resume), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/job', methods=['GET'])
def get_job():
    try:
        job = jobs_collection.find_one()
        if job:
            job['_id'] = str(job['_id'])
            return jsonify(job)
        return jsonify({'error': 'Job not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/resume/file/<filename>', methods=['GET'])
def get_resume_file(filename):
    try:
        return send_from_directory('resumes', filename)
    except Exception as e:
        return jsonify({'error': str(e)}), 404
    
@app.route('/api/<id>/prepare_call', methods=['PUT'])
def prepare_call(id):
    try:
        uri =  os.getenv("DATABASE_URL")
        client = MongoClient(uri)
        print("Connected to MongoDB")
        db = client['user_data']
        collection = db['data']
        result = collection.find_one()
        result = collection.find_one({"UID": id})
        if result:
            if '_id' in result:
                del result['_id']     
            with open('candidate.json', 'w') as f:
                json.dump(result, f, indent=4)
        print("Downloaded candidate info...")
        script_dir = os.path.dirname(os.path.abspath("call.py"))
        script_name = os.path.basename("call.py")
        apple_script = f'''
        tell application "Terminal"
        set newTab to do script "cd '{script_dir}' && conda activate hoya && python '{script_name}'"
        activate
        end tell
        '''
        current_process = subprocess.Popen(['osascript', '-e', apple_script])
        current_process.communicate()
        return jsonify({'message': 'Call preparation done'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    try:
        # Get total count of all resumes
        total_candidates = resumes_collection.count_documents({})
        
        # Get count of completed phone screens
        completed_screens = resumes_collection.count_documents({'phone_screen': 'completed'})
        
        # Get count of high potential candidates (score >= 7)
        high_potential = resumes_collection.count_documents({'initial_score': {'$gte': 7}})
        
        return jsonify({
            'total_candidates': total_candidates,
            'completed_screens': completed_screens,
            'high_potential': high_potential
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Welcome to the Hireflow API'})

if __name__ == '__main__':
    app.run(debug=True, port=3001) 