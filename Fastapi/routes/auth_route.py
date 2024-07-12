from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from models.user import LoginItem,invoice
from models.product import update_product
from config.database import user_collection,collection
from passlib.context import CryptContext
from schemas.user_schema import user_serialize,user_serialize_all
from bson import ObjectId
import os
from pathlib import Path
import uuid
from urllib.parse import urlparse

auth_router = APIRouter()

SECERT_KEY = "evil_like_lusi_son"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context=CryptContext(schemes=["bcrypt"],deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)

@auth_router.post("/login")
async def user_login(loginitem: LoginItem):
    """ user = users.get(loginitem.username) """
    user = user_collection.find_one({"username": loginitem.username})
    if user is None:
        raise HTTPException(status_code=404,detail="Username not found")
    if user and verify_password(loginitem.password,user["password"]):
        token_data = {"username": loginitem.username, "role": user["role"]}
        token = jwt.encode(token_data, SECERT_KEY, algorithm=ALGORITHM)
        user=user_serialize(user)
        if user["role"]=="admin":
            users=user_serialize_all(user_collection.find())
            return {"token": token,"userData":user,"allUsersData":users}
        else:
            return {"token": token,"userData":user}
    raise HTTPException(status_code=401, detail="Invalid password")

@auth_router.put("/edit-product/{_id}")
async def validate_token(_id,data:update_product,token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECERT_KEY, algorithms=[ALGORITHM])
        if payload.get("role")!="admin":
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        data=dict(data.model_dump(exclude_unset=True))
        collection.find_one_and_update(
            {"_id": ObjectId(_id)},
            {"$set": data},
            return_document=True 
        )   
        return {"status":"ok"}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@auth_router.get("/get-user-data")
async def get_user_data(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECERT_KEY, algorithms=[ALGORITHM])
        user = user_collection.find_one({"username": payload.get("username")})
        user= user_serialize(user)
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@auth_router.post("/register")
async def add_user(registerData: LoginItem):
    data=dict(registerData)
    user = user_collection.find_one({"username": data["username"]})
    if user is not None:
        raise HTTPException(status_code=409,detail="Username Taken")
    data["password"]=get_password_hash(data["password"])
    data["role"] = "luu"
    data["profile_pic"]=''
    data["purchased_history"]= []
    user_collection.insert_one(data)
    return {
        "status": "ok"
    }

@auth_router.post("/reset-pwd/{_id}")
async def reset_pwd(_id:str,pw:LoginItem):
    pwd=dict(pw.model_dump(exclude_unset=True))
    pwd["password"]=get_password_hash(pwd["password"])
    user_collection.find_one_and_update({"_id":ObjectId(_id)},{"$set":pwd})
    return {
      "status":"ok"
    }

@auth_router.put("/add-invoice/{_id}")
async def update_invoice(_id,data:invoice):
    items_filtered = [{"title": item.title, "qty": item.qty} for item in data.items]
    
    invoice_data = {
        "date": data.date,
        "totalPrice": data.totalPrice,
        "items": items_filtered
    }
    user_collection.find_one_and_update({"_id":ObjectId(_id)},{"$push": {"purchased_history":invoice_data}})
    return{
        "status":"ok"
    }

@auth_router.get("/get-all-users-data")
async def get_all_users_data():
    users=user_serialize_all(user_collection.find())
    return users

@auth_router.delete("/delete-user/{_id}")
async def delete_user(_id:str):
    selected_user=user_serialize(user_collection.find_one({"_id":ObjectId(_id)}))
    if selected_user["profile_pic"]!="":
        imagePath=selected_user["profile_pic"]
        parsed_url=urlparse(imagePath)
        filename=parsed_url.path.split('/')[-1]
        file_path=f'uploads/{filename}'
        if os.path.exists(file_path):
            os.remove(file_path)

    user_collection.delete_one({"_id":ObjectId(_id)})
    return {
        "status":"ok"
    }