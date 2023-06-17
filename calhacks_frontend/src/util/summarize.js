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
}

export async function stripWidgetSize(widgetName) {
    if (widgetName.endsWith('_large')) {
        return widgetName.slice(0, -6);
    } else if (widgetName.endsWith('_xlarge')) {
        return widgetName.slice(0, -7);
    }

    return widgetName;
}
