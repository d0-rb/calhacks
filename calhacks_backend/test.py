from __future__ import print_function

import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

import base64

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

def get_emails():
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
        for message in messages[:10]:
            msg = service.users().messages().get(userId='me', id=message['id'], format='full').execute()
            payload = msg['payload']
            headers = payload['headers']
            subject = None
            sender = None
            date = None

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

            emails.append({
                'subject': subject,
                'sender': sender,
                'date': date,
                'body': body
            })

    except HttpError as error:
        # TODO(developer) - Handle errors from gmail API.
        print(f'An error occurred: {error}')

    return emails

