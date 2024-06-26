from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from models.user import LoginItem
from config.database import user_collection

auth_router = APIRouter()

SECERT_KEY = "YOUR_FAST_API_SECRET_KEY"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

users = {
    "temitope": {"password": "temipassword", "role": "admin"},
    "john": {"password": "johnpassword", "role": "user"}
}

@auth_router.post("/login")
async def user_login(loginitem: LoginItem):
    """ user = users.get(loginitem.username) """
    user = user_collection.find_one({"username": loginitem.username})
    if user and user["password"] == loginitem.password:
        token_data = {"username": loginitem.username, "role": user["role"]}
        token = jwt.encode(token_data, SECERT_KEY, algorithm=ALGORITHM)
        return {"token": token}
    raise HTTPException(status_code=400, detail="Invalid username or password")

@auth_router.get("/validate-token")
async def validate_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECERT_KEY, algorithms=[ALGORITHM])
        return {"username": payload.get("username"), "role": payload.get("role")}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@auth_router.get("/admin-data")
async def get_admin_data(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECERT_KEY, algorithms=[ALGORITHM])
        if payload.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Not authorized")
        return {"admin_data": "This is protected admin data"}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@auth_router.post("/register")
async def add_user(registerData: LoginItem):
    data=dict(registerData)
    data["role"] = "luu"
    user_collection.insert_one(data)
    return {
        "status": "ok"
    }