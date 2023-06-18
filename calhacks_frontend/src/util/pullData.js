// pull all data needed for briefing from api

export default async function pullData() {
    return {
        "email_reply": [
            {
                "from": "Manager",
                "subject": "Re: Your application",
                "body": "Hi, we are pleased to inform you that you have been accepted to CalHacks! Please reply to this email with your shirt size and dietary restrictions. We look forward to seeing you at the event!",
                "summary": "You have been accepted to CalHacks!",
                "suggested_response": "Thank you so much! I am so excited to attend CalHacks! My shirt size is M and I am vegetarian.",
                "date": "2023-06-17T20:23:08+00:00"
            },
            {
                "from": "Jane Doe",
                "subject": "Are you going to CalHacks?",
                "body": "Hey, are you going to CalHacks? I am looking for a team to join and I was wondering if you would be interested in working together.",
                "summary": "Jane Doe is looking for a team to join.",
                "suggested_response": "Yes, I am going to CalHacks! I would love to work together. What are you interested in working on?",
                "date": "2023-06-17T20:23:08+00:00"
            },
            {
                "from": "Alex Smith",
                "subject": "Your Item on Facebook Marketplace",
                "body": "Hi, I am interested in your item on Facebook Marketplace. Is it still available?",
                "summary": "Alex Smith is interested in your item on Facebook Marketplace.",
                "suggested_response": "Yes, it is still available. When would you like to meet?",
                "date": "2023-06-17T20:23:08+00:00"
            },
        ],
        "finance": {
            "color": "limegreen",
            "summary": "Your finances are in good shape.",
            "emails": [
                {
                    "from": "Bank of America",
                    "subject": "Your account balance",
                    "summary": "Your account balance is $1000.",
                    "body": "Dear valued customer, your account balance is $1000. You have $500 in your checking account and $500 in your savings account. Thank you for banking with us.",
                    "date": "2023-06-17T20:23:08+00:00"
                },
                {
                    "from": "Robinhood",
                    "subject": "Your portfolio performance",
                    "summary": "Your portfolio has increased by 5%.",
                    "body": "Your portfolio has increased by 5%. You have $1000 in your portfolio. You have $500 in stocks and $500 in cryptocurrency. Congratulations!",
                    "date": "2023-06-17T20:23:08+00:00"
                },
            ]
        },
        "meetings": [
            {
                "name": "CalHacks",
                "location": "Pauley Ballroom",
                "time": 1541442340,
            }, 
            {
                "name": "Lunch with Manager",
                "location": "Cafe 3",
                "time": 1541551998,
            },
            {
                "name": "All Hands Meeting",
                "location": "Meeting Room 8.742",
                "time": 1541561998,
            },
        ],
        "chatbot": {
            "answer": "These are the emails that pertain to your query.", 
            'emails': [ 
                { 
                    "sender": "calhacks@gmail.com" , 
                    'subject': "help",
                    'body': "you have 28 hours to submit the project", 
                    'date': "6/17/23",
                }
            ]
        },
        "news": [
            {
                "title": "CalHacks 5.0",
                "summary": "CalHacks 5.0 is coming up! We are expecting over 2000 hackers to attend, and we are looking forward to seeing you there!"
            },
            {
                "title": "New Apple Product",
                "summary": "Apple has released the new Apple Vision Pro, a revolutionary new product that will change the way you see the world."
            }, 
            {
                "title": "New Google Product",
                "summary": "Google has released the new Google Glass, a revolutionary new product that will change the way you see the world."
            }
        ], 
        "weather": {
            "summary": "It's a beautiful day outside!",
            "temperature": "70",
            "high": "75",
            "low": "65",
            "precipitation": "0.0",
            "humidity": "0.5",
            "wind": "5"
        },
        "social_media": [
            {
                "title": "Facebook",
                "summary": "You have 3 new notifications.",
                "summaries": [
                    "John Smith commented on your post: I really like this!",
                    "Jane Doe liked your post.",
                    "Alex Smith commented on your post.",
                ],
            },
            {
                "title": "Twitter",
                "summary": "You're gaining a lot of traction!",
                "summaries": [
                    "John Smith retweeted your tweet: Awesome project!",
                    "Jane Doe liked your tweet.",
                    "Alex Smith retweeted your tweet.",
                    "CalHacks liked your tweet.",
                ],
            },
            {
                "title": "Instagram",
                "summary": "You have 2 direct messages.",
                "summaries": [
                    "John Smith said: Hey, do you want to work on a project together?",
                    "Jane Doe said: Are you going to CalHacks?",
                ],
            },
        ],
    };
}
