from pymongo import MongoClient

client=MongoClient("")

db=client.dummy

collection=db["products"]
