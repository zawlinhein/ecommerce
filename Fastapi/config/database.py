from pymongo import MongoClient
import os
from dotenv import load_dotenv

<<<<<<< HEAD
load_dotenv()

mongo_uri = os.getenv("MONGO_URI")

client=MongoClient(mongo_uri)
=======
client=MongoClient("")
>>>>>>> test/main

db=client.dummy

collection=db["products"]

user_collection=db["users"]
