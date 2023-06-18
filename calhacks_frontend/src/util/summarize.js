// summarize all data from api into a string for gpt

export async function summarize(data) {
    let summary = "******\n";

    if (data?.email_reply.length > 0) {
        summary += "======\n"
        summary += "Emails I should reply to:\n";
        data.email_reply.forEach((email) => {
            summary += "------\n";
            summary += `From:\n${email.from}\n\n`;
            summary += `Subject:\n${email.subject}"\n\n`;
            summary += `Summary:\n${email.summary}"\n\n`;
            summary += `Suggested Response:\n${email['suggested-response']}\n`;
            summary += "------\n";
        });
        summary += "======\n";
    }

    if (data?.meetings.length > 0) {
        summary += "======\n"
        summary += "Upcoming meetings:\n"
        data.meetings.forEach((meeting) => {
            const eventTime = new Date(meeting.time * 1000);
            summary += "------\n";
            summary += `Name:\n${meeting.name}\n\n`;
            summary += `Location:\n${meeting.location}\n\n`;
            summary += `Time:\n${eventTime.toLocaleTimeString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}\n`;
            summary += "------\n";
        });
        summary += "======\n";
    }

    if (data?.social_media.length > 0) {
        summary += "======\n"
        summary += "Social media summaries:\n"
        data.social_media.forEach((platform) => {
            summary += "------\n";
            summary += `Platform:\n${platform.title}\n\n`;
            summary += `Overall summary:\n${platform.summary}\n\n`;
            summary += `Notification summaries:\n${platform.summaries.join('\n')}\n`;
            summary += "------\n";
        });
        summary += "======\n";
    }

    summary += "******\n";

    return summary;
}

export async function getWidgets(data) {
    let widgets = [];
    
    for (const [key, value] of Object.entries(data)) {
        widgets.push(key);
        widgets.push(`${key}_large`);
        widgets.push(`${key}_xlarge`);
    }

    return widgets;
}

export function stripWidgetSize(widgetName) {
    if (widgetName.endsWith('_large')) {
        return [widgetName.slice(0, -6), 2];
    } else if (widgetName.endsWith('_xlarge')) {
        return [widgetName.slice(0, -7), 3];
    }

    return [widgetName, 1];
}
