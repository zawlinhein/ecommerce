from fastapi import APIRouter
from schemas.schema import serialize_all,serialize_one
from models.product import product,update_product
from config.database import collection
from bson import ObjectId


router=APIRouter()

@router.get("/")
async def hello():
    return{
        "hello":"hello"
    }

@router.get("/get/allproducts")
async def get_products():
    res=serialize_all(collection.find())
    return res

@router.get("/get/{_id}")
async def get_one_product(_id:str):
    res=serialize_one(collection.find_one({"_id":ObjectId(_id)}))
    return res

@router.post("/post")
async def post_product(data:product):
    data=dict(data)
    collection.insert_one(data)
    return {
        "status": "ok"
    }

@router.put("/put/{_id}")
async def update_product(_id,data:update_product):
    data=dict(data.model_dump(exclude_unset=True))
    collection.find_one_and_update({"_id":ObjectId(_id)},{"$set":data})
    return{
        "status":"ok"
    }

@router.delete("/delete")
async def delete_product(_id):
    collection.delete_one({"_id":ObjectId(_id)})
    return{
        "status":"ok"
    }
