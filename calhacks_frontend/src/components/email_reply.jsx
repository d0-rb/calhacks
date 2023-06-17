import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';


export default function email_reply(size) {
    return (props) => {
        return (
            <Card sx={{ width: '100%', height: '100%' }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                </Typography>
            </Card>
        )
    }
}
