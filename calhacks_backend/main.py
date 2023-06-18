from fastapi import FastAPI, Query
from query import chatbot

app = FastAPI()

@app.get("/chat")
def query(text: str = Query(...)):
    res = chatbot(text)
    return {"text": res}

# run this for local testing
# uvicorn main:app --reload
