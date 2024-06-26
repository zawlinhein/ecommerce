from pymongo import MongoClient

client=MongoClient("mongodb+srv://zawlinhein:GTGreen666@cluster0.y1r29u8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

db=client.dummy

collection=db["products"]

user_collection=db["users"]
