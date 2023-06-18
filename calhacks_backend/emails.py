from __future__ import print_function
import pandas as pd
from datetime import datetime
from dateutil import parser
from pinecone_upload import embed_and_upsert


import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import base64
import re
import time



# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
SAVE_PATH = '/Users/sunnyjay/Documents/vscode/Hackathon/calhacks/calhacks_backend/emails.csv'

def clean(body):
    cleanedBody = re.sub(r'http\S+', '<link>', body.replace('\r', '').replace('\n', ' ').replace('\t', ''))
    return cleanedBody

def get_emails(num):
    emails = []
    """Shows basic usage of the Gmail API.
    Lists the user's Gmail labels.
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                '/Users/sunnyjay/Documents/vscode/Hackathon/calhacks/calhacks_backend/client_secret_515876991234-nljgbu9v2cs79t9l4l7ot3eevbsbamob.apps.googleusercontent.com.json',
                 SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        # Call the Gmail API
        service = build('gmail', 'v1', credentials=creds)
# Request the list of messages
        response = service.users().messages().list(userId='me').execute()
        messages = response.get('messages', [])

        if not messages:
            print('No messages found.')
            return

        # Print the email subjects
        print('Email Subjects:')
        print(len(messages))
        for message in messages[:num]:
            msg = service.users().messages().get(userId='me', id=message['id'], format='full').execute()
            payload = msg['payload']
            headers = payload['headers']
            subject = 'No Content'
            sender = 'No Content'
            date = 'No Content'
            body = 'No Content'

            if 'parts' in payload:
                for part in payload['parts']:
                    if part['mimeType'] == 'text/plain':
                        body = base64.urlsafe_b64decode(part['body']['data']).decode('utf-8')
                        break
            else:
                if payload['mimeType'] == 'text/plain':
                    body = base64.urlsafe_b64decode(payload['body']['data']).decode('utf-8')


            for header in headers:
                if header['name'] == 'Subject':
                    subject = header['value']
                if header['name'] == 'From':
                    sender = header['value']
                if header['name'] == 'Date':
                    date = header['value']  
            
            def parse_date(date_string):
                print(date_string)
                try:
                    if date_string.endswith(')'):
                        date_string_without_utc = date_string[:-12]
                        parsed_date = datetime.strptime(date_string_without_utc, '%a, %d %b %Y %H:%M:%S')    
                        return parsed_date
                    else:
                        date_string_without_utc = date_string[:-6]
                        parsed_date = datetime.strptime(date_string_without_utc, '%a, %d %b %Y %H:%M:%S')
                        return parsed_date
                except ValueError:
                    print (date_string)
                    return None

            emails.append({
                'subject': subject,
                'sender': sender,
                'date': parser.parse(date),
                'body': clean(body)
            })

    except HttpError as error:
        # TODO(developer) - Handle errors from gmail API.
        print(f'An error occurred: {error}')

    return emails


def update_csv():
    df = pd.read_csv(SAVE_PATH)
    # get the latest date in the csv
    latest_date = parser.parse(df['date'][0])
    print(latest_date)

    # get the latest 10 emails
    emails = get_emails(10)
    sorted_lst = sorted(emails, key=lambda k: k['date'], reverse=True)
    
    # find the oldest new email that is newer than the latest email in the csv
    new_rows = []
    for email in sorted_lst:
        print(email['date'])
        if email['date'] > latest_date:
            new_rows.append(email)

    if new_rows:
        new_df = pd.DataFrame(new_rows)
        df = pd.concat([new_df,df], ignore_index=True)
        df.to_csv(SAVE_PATH, index=False)

    return new_rows

def init_csv():
    emails = get_emails(100)
    df = pd.DataFrame(emails)
    df.to_csv(SAVE_PATH, index=False)

def update_pinecone():
    new_rows = update_csv()
    if not new_rows:
        print('no new emails')
        return
    print(len(new_rows))
    df = pd.DataFrame(new_rows)
    embed_and_upsert(df)

# init_csv()
while True:
    update_pinecone()
    time.sleep(1)