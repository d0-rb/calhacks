from fastapi import FastAPI, Query
from query import chatbot

app = FastAPI()

@app.get("/query")
def query(text: str = Query(...)):
    res = chatbot(text)
    return {"text": res}