// pull all data needed for briefing from api

export default async function pullData() {
    return {
        "email_reply": [
            {
                "from": "Manager",
                "subject": "Re: Your application",
                "body": "Hi, we are pleased to inform you that you have been accepted to CalHacks! Please reply to this email with your shirt size and dietary restrictions. We look forward to seeing you at the event!",
                "summary": "You have been accepted to CalHacks!",
                "suggested_response": "Thank you so much! I am so excited to attend CalHacks! My shirt size is M and I am vegetarian."
            },
            {
                "from": "Jane Doe",
                "subject": "Are you going to CalHacks?",
                "body": "Hey, are you going to CalHacks? I am looking for a team to join and I was wondering if you would be interested in working together.",
                "summary": "Jane Doe is looking for a team to join.",
                "suggested_response": "Yes, I am going to CalHacks! I would love to work together. What are you interested in working on?"
            },
            {
                "from": "Alex Smith",
                "subject": "Your Item on Facebook Marketplace",
                "body": "Hi, I am interested in your item on Facebook Marketplace. Is it still available?",
                "summary": "Alex Smith is interested in your item on Facebook Marketplace.",
                "suggested_response": "Yes, it is still available. When would you like to meet?"
            },
        ],
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
        // maybe not this one
        "media_recommendations": [
            {
                "title": "The Office",
                "summary": "The Office is a great show that you should watch!"
            },
            {
                "documentation": "https://www.youtube.com/watch?v=UWLIgjB9gGw"
            },
            {
                "project notes": "https://do"
            }
        ],
        "suggestions": [
            {
                "commute": "You should leave now to arrive at your meeting on time."
            },
            {
                "to_do": [
                    "You have a meeting with your manager at 12:00 PM.",
                    "publish cr 1.0.0",
                    "send email to manager",
                    "take pto on 11/5/18"
                ]
            }
        ],
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
        "favorites": [
            {
                "manager": "John Smith",
            }, 
            {
                "collaborators": [
                    "Jane Doe",
                    "John Smith",
                    "John Doe"
                ],
            },
            {
                "sister_team" : [
                    "Jane Doe",
                    "John Smith",
                    "John Doe"
                ]
            }
        ]
    };
}
