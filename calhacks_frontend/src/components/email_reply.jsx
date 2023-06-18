import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import './email_reply.css'


export default function email_reply(size, borderRadius, elevation) {
    return ({ data }) => {
        const theme = useTheme();
        console.log(theme);
        return (
            <Card sx={{ width: '100%', height: '100%', borderRadius }} elevation={elevation}>
                <EmailCards data={data} numEmails={size} />
            </Card>
        )
    }
}


function EmailCards({ data, numEmails }) {
    const [showEmail, setShowEmail] = useState(false);
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };

    const emailCards = [];
    for (let i = 0; i < data.length; i++) {
        emailCards.push(
            <Box key={i} sx={{ height: '100%', width: `calc(100% / ${data.length})` }}>
                {i < page * numEmails && i >= (page - 1) * numEmails ? <EmailCard { ...data[i] } setShowEmail={setShowEmail} /> : null}
            </Box>
        )
    }

    console.log((numEmails/data.length) * (page - 1));

    return (
        <>
            <Box sx={{ marginTop: '0%' }}>
                {showEmail ? <EmailDisplay { ...showEmail } setShowEmail={setShowEmail} numEmails={numEmails} length={data.length} /> : null}
            </Box>
            <Box sx={{ marginTop: showEmail ? (showEmail ? (page > 1 ? '-22.3%' : '-25.01%') : '-25%') : '0%' }} className={showEmail ? "EmailDisplayBackground" : ""}>
                <Stack direction="row" spacing={0} sx={{ width: `calc(100% * ${data.length/numEmails})`, marginLeft: `calc(-100% * ${page - 1})` }}>
                    {emailCards}
                </Stack>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                    }}
                >
                    {data.length > numEmails ? <Pagination count={Math.ceil(data.length / numEmails)} page={page} onChange={handleChange} /> : null}
                </Box>
            </Box>
        </>
    )
}


function EmailDisplay({ from, subject, body, setShowEmail, numEmails, length }) {
    const theme = useTheme();

    return (
        <>
            <Stack sx={{ zIndex: 1, position: 'relative', top: '0', left: '0', minWidth: `calc(100% * ${numEmails/length})`, height: '100%'}} className="EmailDisplay">
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
    )
}


function EmailCard({ from, subject, body, summary, suggested_response, setShowEmail }) {
    const theme = useTheme();
    const [sent, setSent] = useState(false);
    // left align text
    return (
        <Box sx={{ height: '90%', width: '90%', padding: '5%' }}>
            <Typography variant="h6" align="left" noWrap={true}>
                {subject}
            </Typography>
            <Typography variant="body2" align="left" noWrap={true} gutterBottom sx={{ color: theme.palette.text.secondary }}>
                {from}
            </Typography>
            <Paper elevation={3}>
                <Typography sx={{ paddingLeft: '5%', paddingTop: '5%', paddingBottom: '5%', float: 'left', maxWidth: '80%' }} variant="body2" align="left" noWrap={true}>
                    {summary}
                </Typography>
                <IconButton sx={{ float: 'right', padding: '4%' }} aria-label="expand" onClick={() => {setShowEmail({from, subject, body})}}>
                    <ChevronRightIcon />
                </IconButton>
                <Box sx={{ height: '3.1rem' }} />
            </Paper>
            <Stack direction="row" spacing={1} sx={{ marginTop: '3%', height: '100%' }}>
                <TextField sx={{ width: '100%', marginTop: '3%' }} label="Suggested Reply" disabled={sent} variant="filled" defaultValue={suggested_response} multiline rows={3} />
                <Box sx={{ aspectRatio: 1, paddingTop: '20%' }}>
                    <IconButton aria-label="send" onClick={() => {setSent(true)}}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </Stack>
        </Box>
    )
}
