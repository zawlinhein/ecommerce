from pydantic import BaseModel
from typing import List

class LoginItem(BaseModel):
    username: str=None
    password: str=None

class user_role(BaseModel):
    role : str

class purchased_items(BaseModel):
    title: str
    qty: int

class invoice(BaseModel):
    date: str
    totalPrice: float
    items:List[purchased_items]

