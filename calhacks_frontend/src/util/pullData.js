import { mockFragment1, mockFragment2, mock1, mock2 } from './mocks';

// pull all data needed for briefing from api

export default async function pullData(openai) {
    let data = mockFragment2;
    let categories = {};

    try {
        // const response = await fetch('http://localhost:8000/categories');
        // categories = await response.json();

        // for (const [category, categoryData] of Object.entries(categories)) {
        //     if (categoryData?.emails?.length > 0) {
        //         categoryData.emails.forEach((email, i) => {
        //             openai.createChatCompletion({
        //                 model: "gpt-3.5-turbo-0613",
        //                 messages: [
        //                     {"role": "system", "content": "You are an assistant summarizes emails to provide daily briefings."},
        //                     {"role": "user", "content": `Here is a summary of an email:\nFrom: ${email.from}\nSubject: ${email.subject}\nDate: ${new Date(email.date * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}\nBody: ${email.body}\n\nPlease summarize in around 5 words.`},
        //                 ],
        //             }).then((response) => {
        //                 const summary = response.data.choices[0].message.content.trim();
                        
        //                 categoryData.emails[i].summary = summary;
        //             });
        //         })
                
        //         // categoryData.emails[i].summary = 'Sample Summary';
        //     } else {
        //         delete categories[category];
        //     }
        // }

        categories = mock2;
    } catch (error) {
        console.warn(error);
    }

    // update data with categories
    data = {
        ...data,
        ...categories,
    };

    // calendar ?!
    

    return data;
}
