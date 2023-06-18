import { useEffect, useState } from 'react';
import { Box, Card, CardContent, IconButton, Stack, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';


export default function social_media(size, borderRadius, elevation) {
    return ({ data }) => {
        return (
            <Card sx={{ width: "100%", height: "100%", borderRadius }} elevation={elevation}>
                <Stack sx={{ width: "100%", height: "100%" }} direction="row" spacing={0}>
                    hi
                </Stack>
            </Card>
        );
    }
}
