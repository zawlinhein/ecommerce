from fastapi import FastAPI
from routes.route import router
from routes.auth_route import auth_router
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()

app.include_router(router)
app.include_router(auth_router)
origins=[
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"]
)