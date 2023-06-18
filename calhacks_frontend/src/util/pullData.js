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
            "answer":"Based on the provided context, Mr.SchwiftyBeats mentioned the following regarding ham and pork: \"THAT IS MY HAM. GIVE ME MY PORK BACK.\" It is not entirely clear what he is referring to as both ham and pork are mentioned and it seems to be a bit jumbled. However, it seems that he believes something that belongs to him has been taken and he wants it returned.",
            "emails":[
                {
                    "body":"THAT IS MY HAM. GIVE ME MY PORK BACK. ",
                    "date":"2023-06-17T21:12:04-07:00",
                    "sender":"\"Mr. Schwifty Beats\" <hijackmotocar5@gmail.com>",
                    "subject":"I NEED MY HAM BACK"
                },
                {
                    "body":"HEY. THOSE ARE MY BEANS. I NEED MY BEANS BACK. respectfully, Mr.SchwiftyBeats ",
                    "date":"2023-06-17T21:00:44-07:00",
                    "sender":"\"Mr. Schwifty Beats\" <hijackmotocar5@gmail.com>",
                    "subject":"I NEED THE BEANS NOW!!"
                },
                {
                    "body":"test ",
                    "date":"2023-06-17T16:09:26-07:00",
                    "sender":"\"Mr. Schwifty Beats\" <hijackmotocar5@gmail.com>",
                    "subject":"test"
                },
                {
                    "body":"teat4 ",
                    "date":"2023-06-17T16:26:54-07:00",
                    "sender":"\"Mr. Schwifty Beats\" <hijackmotocar5@gmail.com>",
                    "subject":"test4"
                },
                {
                    "body":"ch ",
                    "date":"2023-06-17T19:23:27-07:00",
                    "sender":"\"Mr. Schwifty Beats\" <hijackmotocar5@gmail.com>",
                    "subject":"dd"
                },
                {
                    "body":"c ",
                    "date":"2023-06-17T19:21:20-07:00",
                    "sender":"\"Mr. Schwifty Beats\" <hijackmotocar5@gmail.com>",
                    "subject":"f"
                },
                {
                    "body": "what is the meaning of life?",
                    "date":"2023-06-16T07:52:39+00:00",
                    "sender":"Your Rancho Ramon neighbors <no-reply@rs.email.nextdoor.com>",
                    "subject":"Top post: Safeway Tassajara has it all!"

                },
                {
                    "body": "what is the meaning of life? 42",
                    "date":"2023-06-15T07:48:23+00:00",
                    "sender":"Your Rancho Ramon neighbors <no-reply@rs.email.nextdoor.com>",
                    "subject":"Top post: Yesterday we said goodbye to our fur baby): he lived a long and..."
                },
                {
                    "body": "how well are you doing at the moment?",
                    "date":"2023-06-17T20:23:08+00:00",
                    "sender":"Your Rancho Ramon neighbors <no-reply@rs.email.nextdoor.com>",
                    "subject":"Top post: Today was very bittersweet."
                },
                {
                    "body":"No Content",
                    "date":"2023-06-17T06:48:57+00:00",
                    "sender":"Reddit <noreply_at_redditmail_com_dswsd68264_918e97ce@privaterelay.appleid.com>",
                    "subject":"\"Everybody in the US Is Getting Depressed, CD...\""
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
                "notifications": [
                    {
                        "from": "John Smith",
                        "summary": "John Smith commented on your post.",
                        "body": "I love this post!"
                    },
                    {
                        "from": "Jane Doe",
                        "summary": "Jane Doe liked your post.",
                        "body": "I love this post!"
                    },
                    {
                        "from": "Jane Doe",
                        "summary": "Jane Doe liked your post.",
                        "body": "I love this post!"
                    }
                ]
            },
            {
                "title": "Twitter",
                "summary": "You have 3 new notifications.",
                "notifications": [
                    {
                        "from": "John Smith",
                        "summary": "John Smith commented on your post.",
                        "body": "I love this post!"
                    },
                    {
                        "from": "Jane Doe",
                        "summary": "Jane Doe liked your post.",
                        "body": "I love this post!"
                    },
                    {
                        "from": "Jane Doe",
                        "summary": "Jane Doe liked your post.",
                        "body": "I love this post!"
                    }
                ]
            },
            {
                "title": "Instagram",
                "summary": "You have 3 new notifications.",
                "notifications": [
                    {
                        "from": "John Smith",
                        "summary": "John Smith commented on your post.",
                        "body": "I love this post!"
                    },
                    {
                        "from": "Jane Doe",
                        "summary": "Jane Doe liked your post.",
                        "body": "I love this post!"
                    },
                    {
                        "from": "Jane Doe",
                        "summary": "Jane Doe liked your post.",
                        "body": "I love this post!"
                    }
                ] 
            }
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
