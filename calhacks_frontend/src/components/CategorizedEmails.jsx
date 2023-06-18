import { useEffect, useState } from 'react';
import { Box, ButtonBase, Card, CardContent, IconButton, Stack, Typography, Grid, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTheme } from '@mui/material/styles';
import './CategorizedEmails.css';

export default function CategorizedEmails(size, borderRadius, elevation, category) {
    return ({ data }) => {
        return (
            <Card sx={{ width: "100%", height: "100%", borderRadius }} elevation={elevation}>
                <Box sx={{ width: "100%", height: "3%", backgroundColor: data?.color }} />
                <Box sx={{ width: "100%", height: "97%" }} overflow="auto">
                    <Typography variant="h5" sx={{ fontWeight: 'bold', paddingTop: '2%' }}>
                        {category.toUpperCase()}
                    </Typography>
                    <Emails emails={data?.emails} size={size} />
                </Box>
            </Card>
        );
    }
}


function Emails({ emails, size }) {
    return (
        <Box sx={{ width: '100%', paddingTop: '2%' }}>
            <Grid container sx={{ width: '100%' }} spacing={0} columns={size * 4}>
                {
                    emails.map((email, i) => {
                        return (
                            <EmailChip {...email} size={size} idx={i} key={i} />
                        )
                    })
                }
            </Grid>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.4)", paddingTop: '2%', paddingBottom: '2%' }}>
                You've reached the end of your emails here! 😎
            </Typography>
        </Box>
    );
}


function EmailChip({ from, subject, summary, body, date, size, idx }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <Grid item xs={4 * size}>
            <Box sx={{ width: '96%', height: 'calc(100% - 15px)', padding: '2%', backgroundColor: `rgba(0, 0, 0, ${0.2 / (idx + 1)})` }} className="EmailChip">
                <Box>
                    <Typography variant="body1" align="left" sx={{ float: 'left', fontWeight: 'bold' }}>
                        {from}
                    </Typography>
                    <IconButton sx={{ float: 'right', padding: '3.5%' }} aria-label="expand" onClick={() => {setExpanded(!expanded)}}>
                        {expanded ? <ExpandLessIcon />  : <ExpandMoreIcon />}
                    </IconButton>
                    <br />
                </Box>
                {expanded ? (
                    <>
                        <Typography variant="body2" align="left" inline>
                            {(new Date(Date.parse(date))).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}
                        </Typography>
                        <Typography variant="h6" align="left">
                            {subject}
                        </Typography>
                    </>)
                    : null
                }
                <Typography variant="body1" align="left">
                    {expanded ? body : summary}
                </Typography>
            </Box>
        </Grid>
    )
}
