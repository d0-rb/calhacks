import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
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

    return (
        <Stack direction="row" spacing={1} sx={{ width: `calc(100% * ${data.length/numEmails})` }}>
            {emailCards}
        </Stack>
    );
}


function EmailCard({ from, subject, body, summary, suggested_response }) {
    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            {from}
        </Box>
    )
}
