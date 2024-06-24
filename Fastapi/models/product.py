from pydantic import BaseModel
from typing import List

class product(BaseModel):
    id:int
    title:str
    description:str
    price:float
    stock:int
    images:List[str]
    thumbnail: str
    sku:str
    category:str
    brand:str
    rating:float

class update_product(BaseModel):
    title:str=None
    description:str=None
    price:float=None
    stock:int=None