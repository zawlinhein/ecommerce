from fastapi import APIRouter
from config.database import category_collection,collection
from schemas.schema import serialize_all

category_router=APIRouter()

@category_router.post("/post")
async def cate_post(cate:str):
    res=serialize_all(collection.find({"category":cate}))
    filter_ids=[obj['_id'] for obj in res]
    return {"ids":filter_ids}