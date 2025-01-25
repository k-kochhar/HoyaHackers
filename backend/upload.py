from PyPDF2 import PdfReader
import re
from openai import OpenAI
import os
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from typing import Dict, Tuple, List
import requests
from pymongo import MongoClient
import json

load_dotenv()


def extract_pdf_text(pdf_path):
   reader = PdfReader(pdf_path)
   text = ""
   for page in reader.pages:
       text += page.extract_text()
   text = re.sub(r'\s+', ' ', text).strip()
   print(text)
   return text

def save_pdf(source_path, target_folder, new_name):
   os.makedirs(target_folder, exist_ok=True)

   if not new_name.endswith('.pdf'):
       new_name += '.pdf'
       
   base, ext = os.path.splitext(new_name)
   counter = 1
   target_path = os.path.join(target_folder, new_name)
   
   while os.path.exists(target_path):
       new_name = f"{base}_{counter}{ext}"
       target_path = os.path.join(target_folder, new_name)
       counter += 1

   with open(source_path, 'rb') as src, open(target_path, 'wb') as dst:
       dst.write(src.read())
   
   return target_path


os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
client = OpenAI()


class result(BaseModel):
    name: str
    graduation_year: int
    years_of_experience: int
    education: str
    gpa: float
    email:  str
    phone: str
    initial_score: float
    notes: str
    technical_skills: str
    

def process_pdf(pdf_path):
    try:
        resume_text = extract_pdf_text(pdf_path)
        with open('job.txt', 'r') as f:
            job = f.read().strip()

        with open('uid_count.txt', 'r') as f:
            uid = int(f.read().strip())
       
        print("Processing pdf...")
        messages=[{
                'role': 'system',
                'content': f"""" You are part of a HR recruiting team whose job is to extract information from resumes and give an initial score to the applicants based on just their resumes.
                This is the description of the job that you should use to grade the applicants:
                {job}
                
                Award 2 points for relevant work experience that directly aligns with the position's requirements, 
                demonstrating progressive responsibility and quantifiable achievements; 
                2 points for education and certifications that match or exceed the role's prerequisites; 
                2 points for technical skills and competencies specifically mentioned in the job description; 
                1.5 points for clear, professional formatting with no errors, consistent styling, and easy readability; 
                1.5 points for compelling accomplishment statements that use strong action verbs and include measurable results or impacts; 
                and 1 point for additional relevant elements such as volunteer work, leadership roles, or professional memberships that 
                add value to the candidate's profile – deduct points proportionally for missing or weak elements in each category.

                The total will alwasy be out of 10 points.

                Additionaly, summarzie and add notes of anything that can help the recuiter to make a decision about the applicantt for the notes parameter.

                Fill out the form properly and accurately according to the parameters given

                """
            }]

        formatted_user_query = f"""
                 This is the resume of the applicant:
                {resume_text}


        """
        messages.append(
                {
                    'role': 'user',
                    'content':formatted_user_query
                })
        response = client.beta.chat.completions.parse(
            model="gpt-4o",
            messages=messages,
            response_format=result
        )
        applicant = response.choices[0].message.parsed


        pdf_name = save_pdf(pdf_path, "resumes", f"{applicant.name}.pdf")
        uri = os.getenv("DATABASE_URL")
        mongo= MongoClient(uri)
        db = mongo['user_data']
        collection = db['data'] 
        applicant_info = {
        "name": applicant.name,
        "graduation_year": applicant.graduation_year,
        "education": applicant.education,
        "yoe": applicant.years_of_experience,
        "gpa": applicant.gpa,
        "email": applicant.email,
        "phone": applicant.phone,
        "initial_score": applicant.initial_score,
        "notes": applicant.notes,
        "status": "new",
        "secondary_score": 0,
        "location": pdf_name,
        "file_name": pdf_name,
        "technical_skills":applicant.technical_skills,
        "UID": uid
        }
        print(applicant_info)
        print("Inserting appplicant into db...")
        collection.insert_one(applicant_info)
        with open('uid_count.txt', 'w') as f:
            f.write(str(uid + 1))
        return True

    except Exception as e:
        print(f"Error: {str(e)}")
        return False
    
if __name__== "__main__":
    process_pdf("Ritesh_Thipparthi_Resume_2027.pdf")