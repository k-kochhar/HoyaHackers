import pandas as pd
from pymongo import MongoClient
from pymongo.errors import ConnectionError, OperationFailure

try:
    # Replace with your MongoDB Atlas connection string
    connection_string = "mongodb+srv://<username>:<password>@<cluster-url>/"
    
    # Connect to cluster
    client = MongoClient(connection_string)
    
    # Switch to admin database
    db = client.admin
    
    # Create or access collection
    collection = db.your_collection_name
    
    # Read CSV file
    df = pd.read_csv('your_file.csv')
    
    # Convert DataFrame to list of dictionaries
    records = df.to_dict('records')
    
    # Insert documents into collection
    result = collection.insert_many(records)
    
    print(f"Successfully inserted {len(result.inserted_ids)} documents")
    
except ConnectionError as e:
    print(f"Failed to connect to MongoDB: {e}")
except OperationFailure as e:
    print(f"Authentication or permission error: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
finally:
    # Close the connection
    client.close()
