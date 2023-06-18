from pinecone_upload import query
import openai
import os
import dotenv
dotenv.load_dotenv()

q = "What events was meetup notifying me me about?"
def chatbot(q):
    res = query(q)
    emails = [message['metadata'] for message in res['matches']]

    context = f"Sender: {res['matches'][0]['metadata']['sender']}, Subject: {res['matches'][0]['metadata']['subject']}, Body: {res['matches'][0]['metadata']['body']}"
    # print(context)
    openai.api_key = os.getenv("OPENAI_API_KEY")
    __system_prompt = """
        You are a helpful, clever, and very friendly assistant. The user will be giving you a QUESTION regarding information from their email, 
        and CONTEXT will be provided from a selected email from the users email account. These are what the people/orgaizations are saying.
        You (the assistant) may use information from the provided context to answer the question. If there is a person in question,
        you can assume the provided context is an email from them, and the context is what they said.
        """
    __base_prompt = f"""
        QUESTION:
        {q}
        CONTEXT:
        {context}
        """

    res = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": __system_prompt},
            {"role": "user", "content": __base_prompt},

        ]
    )
    return {"answer":res['choices'][0]['message']['content'], 'emails': emails}

