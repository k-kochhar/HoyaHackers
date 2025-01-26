import pymongo
import os
from langchain_community.embeddings import OpenAIEmbeddings
import pinecone
import openai
from dotenv import load_dotenv
import json
from PyPDF2 import PdfReader
import re
load_dotenv(dotenv_path='../../.env')

# Initialize connections
client = pymongo.MongoClient(os.getenv("DATABASE_URL"))
db = client["user_data"]
collection = db["data"]

pc = pinecone.Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index_name = "hoyahacks"
index = pc.Index(index_name)

openai.api_key = os.getenv("OPENAI_API_KEY")
embeddings = OpenAIEmbeddings()

import openai
from openai import OpenAI

def generate_candidate_justification(metadata, query):
    try:
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system", 
                    "content": "You are a professional recruiter explaining why a candidate is an excellent match for a position."
                },
                {
                    "role": "user", 
                    "content": f"""
                    Analyze this candidate's profile and the search query:
                    
                    Candidate Name: {metadata.get('name', 'Unknown')}
                    Education: {metadata.get('education', 'N/A')}
                    Skills: {metadata.get('skills', 'N/A')}
                    Experience: {metadata.get('experience_years', 0)} years
                    Notes: {metadata.get('full_text', 'N/A')}
                    
                    Search Query: {query}
                    
                    Provide a concise, compelling paragraph explaining why this candidate would be an excellent choice for the position. 
                    Focus on their most relevant skills, experiences, and potential impact.
                    """
                }
            ],
            max_tokens=200
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Unable to generate justification: {str(e)}"

def create_searchable_text(resume_entry):
    search_fields = [
        resume_entry.get('name', ''),
        resume_entry.get('education', ''),
        resume_entry.get('technical_skills', ''),
        resume_entry.get('notes', ''),
        str(resume_entry.get('graduation_year', '')),
        str(resume_entry.get('yoe', ''))
    ]
    return ' '.join(filter(bool, search_fields))

# UPSERTING ROUTE
def upsert_resume_vectors():
    vectors_to_upsert = []
    
    for entry in collection.find():
        search_text = create_searchable_text(entry)
        vector = embeddings.embed_query(search_text)
        
        vectors_to_upsert.append({
            "id": str(entry['_id']),
            "values": vector,
            "metadata": {
                "uid": entry.get('uid', ''),
                "id": str(entry['_id']),
                "name": entry.get('name', ''),
                "skills": entry.get('technical_skills', ''),
                "education": entry.get('education', ''),
                "graduation_year": entry.get('graduation_year', ''),
                "experience_years": entry.get('yoe', 0),
                "full_text": search_text
            }
        })
    
    batch_size = 100
    for i in range(0, len(vectors_to_upsert), batch_size):
        batch = vectors_to_upsert[i:i+batch_size]
        index.upsert(vectors=batch, namespace="resumes")
    
    print(f"Upserted {len(vectors_to_upsert)} resume vectors")

def advanced_resume_search(query, top_k=5):
    try:
        # Generate embedding
        query_embedding = embeddings.embed_query(query)
        
        # Pinecone search
        results = index.query(
            vector=query_embedding, 
            top_k=top_k * 3,
            include_metadata=True,
            namespace="resumes"
        )
        
        # Filtering and ranking
        detailed_matches = []
        for match in sorted(results.get('matches', []), key=lambda x: x.get('score', 0), reverse=True):
            if len(detailed_matches) >= top_k:
                break
            
            metadata = match.get('metadata', {})
            if match.get('score', 0) > 0.6:
                uid = int(metadata.get('uid', 0))
                justification = generate_candidate_justification(metadata, query)
                
                detailed_matches.append({
                    "uid": uid,
                    "justification": justification
                })

        for match in detailed_matches:
            print(json.dumps(match, indent=2))
        
        return {"candidates": detailed_matches}
    
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

# # Kshitij can honestly filter and query right outta mongo db but we can do it from here too and tweak it
# def filter_resumes(skills=None, min_experience=None, graduation_year=None):
#     query_vector = None
    
#     if skills:
#         skills_text = ' '.join(skills)
#         query_vector = embeddings.embed_query(skills_text)
    
#     results = index.query(
#         vector=query_vector,
#         filter={
#             "experience_years": {"$gte": min_experience} if min_experience else None,
#             "graduation_year": graduation_year
#         },
#         top_k=10,
#         include_metadata=True,
#         namespace="resumes"
#     )
    
#     return [match['metadata'] for match in results['matches']]

def delete_all_entries_from_pinecone():
    try:
        namespaces = index.describe_index_stats().get("namespaces", [])
        if "resumes" in namespaces:
            index.delete(delete_all=True, namespace="resumes")
            print("All entries deleted from Pinecone index in 'resumes' namespace.")
        else:
            print("Namespace 'resumes' not found.")
    except Exception as e:
        print(f"Error deleting entries from Pinecone: {str(e)}")


def extract_pdf_text(pdf_path):
   reader = PdfReader(pdf_path)
   text = ""
   for page in reader.pages:
       text += page.extract_text()
   text = re.sub(r'\s+', ' ', text).strip()
   print(text)
   return text


def chat_person(uid, query):
    try:
        candidate_data = collection.find_one({"UID": int( uid)})
        candidate_file= candidate_data["file_name"]
        resume_text=extract_pdf_text(os.path.join('resumes', candidate_file))
        
        if not candidate_data:
            return {"error": "Candidate not found"}
        
        candidate_profile = "\n".join([f"{key}: {value}" for key, value in candidate_data.items()])

        system_message = {
            "role": "system",
            "content": "You are a professional recruiter providing insights into a candidate's profile. You will be provided with a complete profile, and your task is to analyze and provide insights or respond to queries based on the candidate's information."
        }

        user_message = {
            "role": "user",
            "content": f"""
            Here is the candidate's full profile:
            {candidate_profile}
            
            Here is the candidate's resume:
            {resume_text}

            Now, answer the following query:
            {query}
            """
        }

        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[system_message, user_message],
            max_tokens=500
        )
        
        chat_response = response.choices[0].message.content.strip()
        return {"chat_response": chat_response}
    
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}