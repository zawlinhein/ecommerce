from fastapi import APIRouter,UploadFile,File,Form
from schemas.schema import serialize_all,serialize_one
from models.product import product,update_product,review
from config.database import collection
from bson import ObjectId
import os
from pathlib import Path
import uuid
from urllib.parse import urlparse

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

@router.delete("/delete/{_id}")
async def delete_product(_id:str):
    selected_product=serialize_one(collection.find_one({"_id":ObjectId(_id)}))
    imagePath=selected_product["thumbnail"]
    parsed_url=urlparse(imagePath)
    filename=parsed_url.path.split('/')[-1]
    file_path=f'uploads/{filename}'
    if os.path.exists(file_path):
        os.remove(file_path)
    collection.delete_one({"_id":ObjectId(_id)})
    return {
        "status":"ok"
    }

@router.put("/add-review/{_id}")
async def add_review(_id:str,review_data:review):
    review_data=dict(review_data)
    collection.find_one_and_update({"_id":ObjectId(_id)},{"$push":{"reviews":review_data}})
    return{
        "status":"ok"
    }


UPLOAD_FOLDER = "uploads"
Path(UPLOAD_FOLDER).mkdir(parents=True, exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...),
    title: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    stock: int = Form(...),
    sku: str = Form(...),
    category: str = Form(...),
    brand: str = Form(...),
    createdAt:str=Form(...)
):

    file_name=f"{uuid.uuid4()}_{file.filename}"
    file_location = os.path.join(UPLOAD_FOLDER, file_name)  
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())
    file_url = f"http://localhost:8000/{file_location}"
    
    product_data_test = {
            "title":title,
            "description":description,
            "price":price,
            "stock":stock,
            "images":[file_url],
            "thumbnail":file_url,
            "sku":sku,
            "category":category,
            "brand":brand,
            "reviews":[],
            "meta":{"createdAt":createdAt}
        }

    collection.insert_one(product_data_test)
    return {"filename": file.filename, "path": file_url}

