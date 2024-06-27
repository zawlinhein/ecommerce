def user_serialize(user) -> dict:
    return {
        "username":user["username"],
        "role":user["role"],
        "purchased_products":user["purchased_products"]
    }