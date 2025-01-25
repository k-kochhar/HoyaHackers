import pandas as pd
from pymongo import MongoClient, errors
from pymongo.errors import OperationFailure
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv(dotenv_path='../../.env')

try:
    # MongoDB Atlas connection string (ensure it's set in the .env file)
    connection_string = os.getenv("MONGO_URI")

    # Connect to the MongoDB cluster
    client = MongoClient(connection_string)

    # Switch to the user_data database
    db = client['user_data']  # Replace 'user_data' with your desired database name

    # Create or access the 'data' collection
    collection = db['data']  # Replace 'data' with your desired collection name

    # Delete all existing records in the collection
    delete_result = collection.delete_many({})
    print(f"Deleted {delete_result.deleted_count} existing documents.")

    # Read CSV file
    df = pd.read_csv('data.csv')  # Ensure 'data.csv' exists in the same directory

    # Check for missing values in the email field
    missing_values = df[df['email'].isnull()]
    if not missing_values.empty:
        print("Found rows with missing unique field (email):")
        print(missing_values)

    # Add a new column 'UID' with incremental values starting from 1
    df['UID'] = range(1, len(df) + 1)

    # Convert the DataFrame to a list of dictionaries
    records = df.to_dict('records')

    # Insert all records without checking for duplicates
    collection.insert_many(records)
    inserted_count = len(records)

    print(f"Successfully inserted {inserted_count} documents into the 'user_data' database and 'data' collection.")

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
