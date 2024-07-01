def user_serialize(user) -> dict:
    return {
        "_id":str(user["_id"]),
        "username":user["username"],
        "role":user["role"],
        "purchased_history":user["purchased_history"]
    }