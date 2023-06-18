from fastapi import FastAPI, Query
from query import chatbot

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/chat")
def query(text: str = Query(...)):
    res = chatbot(text)
    return {"text": res}

@app.get("/categories")
def categories():
    pass
    

# run this for local testing
# uvicorn main:app --reload
