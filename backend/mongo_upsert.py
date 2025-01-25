import pandas as pd
from pymongo import MongoClient, errors
from pymongo.errors import OperationFailure
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv(dotenv_path='../../.env')

try:
    # MongoDB Atlas connection string (hardcoded for now)
    connection_string = os.getenv("MONGO_URI")

    # Connect to the MongoDB cluster
    client = MongoClient(connection_string)

    # Switch to the user_data database
    db = client['user_data']  # Replace 'user_data' with your desired database name

    # Create or access the 'data' collection
    collection = db['data']  # Replace 'data' with your desired collection name

    # Read CSV file
    df = pd.read_csv('data.csv')  # Ensure 'data.csv' exists in the same directory

    # Check for duplicates based on the unique field (e.g., email)
    duplicates = df[df.duplicated(subset=['email'], keep=False)]
    if not duplicates.empty:
        print("Found duplicates in the following rows:")
        print(duplicates)

    # Check for missing values in the unique field (e.g., email)
    missing_unique = df[df['email'].isnull()]
    if not missing_unique.empty:
        print("Found rows with missing unique field (email):")
        print(missing_unique)

    # Convert the DataFrame to a list of dictionaries
    records = df.to_dict('records')

    inserted_count = 0
    skipped_count = 0

    for record in records:
        # Define a unique identifier for each record (e.g., email)
        unique_filter = {"email": record["email"]}  # Change 'email' to a unique field in your data
        
        # Check if the record exists in the collection
        existing = collection.find_one(unique_filter)
        
        if not existing:
            collection.insert_one(record)
            inserted_count += 1
        else:
            skipped_count += 1
            print(f"Duplicate found for email: {record['email']}")

    print(f"Successfully inserted {inserted_count} new unique documents into the 'user_data' database and 'data' collection.")
    print(f"Skipped {skipped_count} duplicate entries.")

except errors.ConnectionFailure as e:
    print(f"Failed to connect to MongoDB: {e}")
except OperationFailure as e:
    print(f"Authentication or permission error: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
finally:
    try:
        # Close the connection if the client was created successfully
        client.close()
    except NameError:
        print("Client was not created, no need to close the connection.")
