from fastapi import FastAPI, Query
from query import chatbot

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from embed import assignCats
import json
from sql import get_calendar

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

@app.get("/calendar")
def calendar():
    return get_calendar()

@app.get("/categories")
def categories():
    # download the files to the local csv
    # there has to be logic download the latest files from the gmail api
    jsonOut, finalCats = assignCats("email.csv", load_list_from_json('cats.json'))
    save_list_to_json('cats.json', finalCats)
    return jsonOut

# def initCategories():
#     # pull the emails from the gmail app and then upload those to the pinecone database
#     # store the finalCats locally
#     jsonOut, finalCats = assignCats('emails.csv')
#     save_list_to_json('cats.json', finalCats)

def save_list_to_json(file_path, data):
    with open(file_path, 'w') as json_file:
        json.dump(data, json_file)

def load_list_from_json(file_path):
    with open(file_path, 'r') as json_file:
        data = json.load(json_file)
        return data
    

# run this for local testing
# uvicorn main:app --reload
