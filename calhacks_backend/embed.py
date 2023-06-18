import pandas as pd
import openai, os, time
import pandas as pd
import json
import datetime as dt
from dateutil import parser

openai.api_key = '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'

def functionCompletion(prompt, functions, func_call= "get_category_and_rating", model='gpt-3.5-turbo-0613'):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(model=model, messages=messages, functions = functions, function_call={"name":func_call})
    return response["choices"][0]["message"]

def functionResponse(categories, email):
    prompt = f"Categorize the following text into these categories or put it into a new summarized category if you think of a better one (but try your best to stay within these categories). If you come up with a new category, keep the name under 5 words and provide a brief description of category. Also, if you really can't think of a new category just fit into existing categories. This is the text: {email}. Also, these are the current categories: {','.join(categories)} of which there currently are {len(categories)}. "

    functions = [
        {
            "name": "get_category_and_rating",
            "description": "Get the category of the email and optional category to delete",
            "parameters": {
                    "type":"object",
                    "properties":{
                        "Category": {
                                "type": "string",
                                "description": "The category from the specified list or new category with short description. Return 1 category",
                            },
                        "Description": {
                                "type": "string",
                                "description": "Slightly more detailed but brief description of what the new category means (or NONE). Return NONE or 1 description."
                            },
                        },
                    "required": ["Category", "Description"],
                },
          }    
    ]

    return functionCompletion(prompt=prompt, functions=functions)

def generateColorsHelper(final_categories):

    prompt = f"Generate hex color codes for the following list of categories based on sentiment: {final_categories}. Only give me a list of hex codes as response where there is a response for EACH CATEGORY."

    functions = [
        {
            "name": "get_hex_codes",
            "description": "Get hex codes for each cateogry",
            "parameters": {
                    "type":"object",
                    "properties":{
                        "HexCodes": {
                                "type": "string",
                                "description": f"List of hexcode values in order of input categories (hexcode only with no special characters). Category names as follows:{final_categories}",
                            },
                        },
                    "required": ["HexCodes"],
                },
          }    
    ]

    return functionCompletion(prompt=prompt, functions=functions, func_call = "get_hex_codes")

def generateColors(final_categories):
    response = generateColorsHelper(final_categories)
    function_args = json.loads(response['function_call']['arguments'], strict=False)
    hexcodes = function_args.get("HexCodes").split(",")

    return final_categories, hexcodes


def genMessageQuery(message, model="gpt-4"):
    messages = [{"role": "user", "content": message}]

    response = openai.ChatCompletion.create(
    model=model,
    messages=messages,
    temperature=0,
  )
    return response['choices'][0]['message']


def spamClassification(email):
    prompt = f"Classify the following message as spam or not spam:\n\n{email}\n\nAnswer either SPAM or NOT SPAM"
    return genMessageQuery(prompt) == "SPAM"


def initCategorizeEmails(categories, emails, model='gpt-4'):
    catMap = {categories[i]: 1 for i in range(len(categories))}
    emailMap = {}

    for i,email in enumerate(emails[:2]):
        if(spamClassification(email)):
            catMap['Spam'] += 1
            if('Spam' in emailMap):
                emailMap['Spam'].append(i)
            else:
                emailMap['Spam'] = [i]
            continue

        sorted_keys = sorted(catMap, key=catMap.get, reverse=True)
        top_keys = sorted_keys[:10] if len(sorted_keys) > 10 else sorted_keys

        response = functionResponse(top_keys, email)
        function_args = json.loads(response['function_call']['arguments'])
        category = function_args.get("Category")
        if(len(category) > 30):
            category = "other"

        if(category in emailMap):
            emailMap[category].append(i)
        else:
            emailMap[category] = [i]

        if(category in catMap):
            catMap[category] += 1
        else:
            catMap[category] = 1

    finalCats, colorList = generateColors(emailMap.keys())

    return emailMap, finalCats, colorList

def generateJson(emailMap, colorList, finalCats, emails):
    overallDict = {}
    for i, cat in enumerate(finalCats):
        allEmails = []
        for idx in emailMap[cat]:
            subject = emails.subject[idx]
            sender = emails.sender[idx]
            date = emails.epoch_time[idx]
            body = emails.body[idx]
            allEmails.append({'from': sender, 'subject': subject, 'body': body, 'date': date})
        innerDict = {'color': colorList[i], 'emails':allEmails}
        overallDict[cat] = innerDict
    return overallDict


def assignCats(emails, currentCats=None):
    categories = currentCats
    if(currentCats == None):
        categories = ['Spam', 'Emails to reply to', 'Financial/Invoices', "Social Media/Networking", "Meetings/Events", "Weather", "News", "Suggestions (To-do lists, traffic updates, etc)", "Security/Privacy"]

    emails = pd.read_csv("emails.csv")
    emails['date'] = emails['date'].apply(lambda x: parser.parse(x))
    emails['epoch_time'] = emails['date'].apply(lambda x: int(x.timestamp()))

    emailMap, finalCats, colorList = initCategorizeEmails(categories, emails.body)
    jsonOut = generateJson(emailMap, colorList, finalCats, emails)
    return jsonOut, finalCats

assignCats(None)
