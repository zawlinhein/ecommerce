def serialize_one(product) -> dict:
    return {
        "_id":str(product["_id"]),
        "id":product["id"],
        "title":product["title"],
        "description":product["description"],
        "price":product["price"],
        "stock":product["stock"],
        "images": product["images"],
        "thumbnail": product["thumbnail"],
        "sku":product["sku"],
        "category":product["category"],
        "rating":product["rating"],
        "brand":product["brand"]
    }

def serialize_all(products) -> list:
    return [serialize_one(product) for product in products]