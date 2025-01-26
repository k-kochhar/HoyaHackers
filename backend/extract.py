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


os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")


client = OpenAI()


messages=[{
                'role': 'system',
                'content': f"""" You are part of a HR recruiting teajm whose job is to grade applicaants on a scale of 1 - 10 based on the transcript of the phone screening caall that they had with our agent.
                 This is the rubric that you should use to grade the applicants:
                 Detailed Phone Screen Evaluation Rubric (0-10)

                    Initial Impression & Cultural Fit (2 points)

                    Professional greeting and demeanor (0.5)
                    Response to Coke vs Pepsi question (0.5)

                    Shows personality and humor
                    Handles unexpected questions well


                    Energy level and enthusiasm (0.5)
                    First 2 minutes overall impression (0.5)


                    Experience & Technical Skills (3 points)

                    Relevant work experience examples (1.0)

                    Provides specific scenarios
                    Quantifiable achievements
                    Clear role in outcomes


                    Technical skills alignment (1.0)

                    Matches job requirements
                    Depth of knowledge
                    Real-world application


                    Industry knowledge (1.0)

                    Understanding of sector
                    Coca-Cola specific knowledge
                    Market awareness




                    Communication Skills (2 points)

                    Verbal clarity (0.5)

                    Clear articulation
                    Appropriate pace
                    Professional vocabulary


                    Listening ability (0.5)

                    Answers match questions
                    Limited interruptions
                    Appropriate follow-up


                    Question quality (0.5)

                    Thoughtful inquiries
                    Relevant to role
                    Shows preparation


                    Overall engagement (0.5)

                    Maintains conversation flow
                    Shows interest
                    Professional rapport




                    Practical Alignment (2 points)

                    Salary expectations (0.5)

                    Within budget range
                    Reasonable for experience


                    Availability/Notice period (0.5)

                    Start date feasibility
                    Current commitments


                    Location/Travel requirements (0.5)

                    Commute/relocation plans
                    Travel flexibility


                    Work authorization/Logistics (0.5)

                    Visa status if applicable
                    Schedule flexibility




                    Red Flags (-0.5 points each)

                    Vague or inconsistent answers
                    Unprofessional language/behavior
                    Negative comments about previous employers
                    Exaggerated or unverifiable claims
                    Poor listening/frequent interruptions
                    Generic, rehearsed responses
                    Lack of company research
                    Misleading resume information
                    Arrogant or overconfident attitude
                    Evasive about experience/skills



                    Final Score Calculation:

                    Start with base 10 points
                    Award points in each category based on performance
                    Deduct for red flags
                    Round to nearest 0.5

                    Final Score: __/10
    
                    Comments:
                    Key Strengths:
                    1.
                    2.
                    3.
                    Areas of Concern:
                    1.
                    2.
                    3.
                    Additional Observations:

                    Body language/tone:
                    Cultural fit indicators:
                    Technical capability evidence:
                    Outstanding qualities:
                    Risk factors:

                 Based on the above rubric return the correct parameters while complyimg wth the format

                """
            }]

class result(BaseModel):
    final_score: int
    comments: str
    

def extract_and_update():
    try:
        print("Extracting and updating data...")
        with open('output.txt', 'r') as file:
            log = file.read()
        
        with open('candidate.json', 'r') as f:
            candidate = json.load(f)

        uid = candidate['UID']
        formatted_user_query = f"""
            This is the transcript:\n
            {log}
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
        uri = os.getenv("DATABASE_URL")
        mongo= MongoClient(uri)
        query = {"UID": uid}  
        db = mongo['user_data']
        collection = db['data'] 
        update = {
        "$set": {
            "secondary_score":  applicant.final_score,
            "phone_screen_notes": applicant.comments,
            "phone_screen": "completed",
            
        }
        }
        print("Updating database...")
        collection.update_one(query, update)

    except Exception as e:
        print(f"Error: {str(e)}")
        return False