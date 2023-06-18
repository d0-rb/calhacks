import { useEffect, useState } from 'react';
import { Box, ButtonBase, Card, CardContent, IconButton, Stack, Typography, Grid, Paper } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useTheme } from '@mui/material/styles';


const SOCIALS_ASSETS = {
    Facebook: {
        icon: FacebookIcon,
        color: '#1877F2',
        link: 'https://www.facebook.com/'
    },
    Twitter: {
        icon: TwitterIcon,
        color: '#1DA1F2',
        link: 'https://twitter.com/'
    },
    Instagram: {
        icon: InstagramIcon,
        color: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
        link: 'https://www.instagram.com/'
    }
}


export default function social_media(size, borderRadius, elevation) {
    return ({ data }) => {
        return (
            <Card sx={{ width: "100%", height: "100%", borderRadius }} elevation={elevation}>
                <Stack sx={{ width: "94%", padding: '3%', height: '86%', scrollbarWidth: 0 }} spacing={2} overflow="auto">
                    {
                        data.map((platform) => {
                            return (
                                <SocialCard {...SOCIALS_ASSETS[platform.title]} summary={platform.summary} summaries={platform.summaries} size={size} />
                            )
                        })
                    }
                </Stack>
            </Card>
        );
    }
}

function SocialCard({ icon, color, link, summary, summaries, size }) {
    let cardContents;
    const [summaryIdx, setSummaryIdx] = useState(0);
    const [summaryInterval, setSummaryInterval] = useState(null);
    
    if (size === 1) {
        cardContents = (
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {summary}
            </Typography>
        );
    } else {
        cardContents = (
            <Box sx={{ width: '100%' }}>
                <Stack sx={{ width: '100%' }} direction="row" spacing={2} alignItems="center">
                    {
                        <Typography variant="body1">
                            {summaries[summaryIdx]}
                        </Typography>
                    }
                </Stack>
            </Box>
        );
    }
    const Icon = icon;

    return (
        <Paper elevation={8} sx={{ background: color }}>
            <ButtonBase sx={{ width: '100%', '&:hover': { color: 'inherit' } }} href={link} onMouseOver={() => {
                clearInterval(summaryInterval);
                setSummaryInterval(setInterval(() => {
                    setSummaryIdx((summaryIdx + 1) % summaries.length)
                }, 2000))
            }}>
                <Stack sx={{ padding: '1.95%', width: '96%' }} direction="row" spacing={2} alignItems="center">
                    <Icon sx={{ fontSize: '3rem' }} />
                    {cardContents}
                </Stack>
            </ButtonBase>
        </Paper>
    )
}
