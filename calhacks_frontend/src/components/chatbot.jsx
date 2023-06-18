import * as React from "react";
import { Avatar, Typography, TextField, IconButton, Card, Stack, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";


export default function chatbot(size, borderRadius, elevation) {
    return ({ data }) => {
        const [showEmail, setShowEmail] = React.useState(null);
        return (
            <Card sx={{ width: "100%", height: "100%", borderRadius}} elevation={elevation}>
                {!showEmail ? <ChatInformation answer={data.answer} borderRadius={borderRadius} elevation={elevation} setShowEmail={setShowEmail}/> : null}
                {showEmail ? <DisplayEmail from={data.emails[0].sender} subject={data.emails[0].subject} body={data.emails[0].body} setShowEmail={setShowEmail} /> : null}
            </Card>
        );
    }
};

function DisplayEmail({ from, subject, body, setShowEmail }) {
    const theme = useTheme();

    return (
        <>
            <Stack sx={{ zIndex: 1, position: 'relative', top: '0', left: '0'}} className="EmailDisplay">
                <Box sx={{ paddingTop: '4%', paddingLeft: '4%', paddingRight: '4%' }}>
                    <Typography sx={{ float: 'left' }} variant="h5" align="left" noWrap={true}>
                        {subject}
                    </Typography>
                    <IconButton sx={{ float: 'right' }} aria-label="close" onClick={() => {setShowEmail(null)}}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography sx={{ paddingLeft: '4%', paddingRight: '4%' }} variant="body1" align="left" noWrap={true} gutterBottom>
                    From: {from}
                </Typography>
                <Box sx={{ marginLeft: '4%', marginRight: '4%', marginTop: '2%', marginBottom: '4%', maxHeight: '40%', overflow: 'auto' }} elevation={4}>
                    <Typography variant="body2" align="left" gutterBottom>
                        {body}
                    </Typography>
                </Box>
            </Stack>
        </>
    );
}

function ChatInformation({answer, borderRadius, elevation, setShowEmail}) {
    const [sent, setSent] = React.useState(false);
    return (
        <div>
            <Box sx={{ paddingTop: '15%', paddingBottom: '15%' }}>
                <Stack direction="row" spacing={1}>
                    <Avatar sx={{ marginLeft: '3%', marginRight: '3%'}}>B</Avatar>
                    <Typography variant="body1" align="left" sx={{ paddingRight: '3%'}}>
                        {answer}
                    </Typography>
                </Stack>
            </Box>
            <Stack direction="row" spacing={1} sx={{ marginTop: '3%', height: '100%', marginLeft: '5%' }}>
                <TextField sx={{ width: '100%', marginTop: '3%' }} label="Send Response" disabled={sent} variant="filled" multiline rows={3} />
                <Box sx={{ aspectRatio: 1, paddingTop: '20%' }}>
                    <IconButton aria-label="send" onClick={() => {setSent(true); setShowEmail(true);}}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </Stack>
        </div>
    );
}