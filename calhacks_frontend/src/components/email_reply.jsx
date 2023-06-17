import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';


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
    const emailCards = [];
    for (let i = 0; i < data.length; i++) {
        emailCards.push(
            <Box key={i} sx={{ height: '100%', width: `calc(100% / ${data.length})` }}>
                <EmailCard { ...data[i] } />
            </Box>
        )
    }

    if (emailCards.length < numEmails) {
        return (
            <Stack direction="row" spacing={1} sx={{ width: `calc(100% * ${data.length/numEmails})` }}>
                {emailCards}
            </Stack>
        );
    }

    return (
        <Stack direction="row" spacing={0} sx={{ width: `calc(100% * ${data.length/numEmails})` }}>
            {emailCards}
        </Stack>
    );
}


function EmailCard({ from, subject, body, summary, suggested_response }) {
    const theme = useTheme();
    // left align text
    return (
        <Box sx={{ height: '90%', width: '90%', padding: '5%' }}>
            <Typography variant="h5" align="left" noWrap={true}>
                {subject}
            </Typography>
            <Typography variant="body2" align="left" noWrap={true} gutterBottom sx={{ color: theme.palette.text.secondary }}>
                {from}
            </Typography>
            <Paper align="left" elevation={3}>
                <Stack direction="row">
                    <Typography sx={{ padding: '5%' }} variant="body2" align="left" noWrap={true}>
                        {summary}
                    </Typography>
                    <IconButton aria-label="expand">
                        <ExpandMoreIcon />
                    </IconButton>
                </Stack>
            </Paper>
        </Box>
    )
}
