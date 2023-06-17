import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';


export default function email_reply(size) {
    return ({ data }) => {
        const theme = useTheme();
        console.log(theme);
        return (
            <Card sx={{ width: '100%', height: '100%' }} elevation={6}>
                <Stack direction="row" spacing={2}>
                    {(data.length > 0) ? <EmailCard { ...data[0] } /> : <EmailCards data={data} />}
                </Stack>
            </Card>
        )
    }
}


function EmailCards({ data }) {

}


function EmailCard({ from, subject, body, summary, suggested_response }) {
    return 
}
