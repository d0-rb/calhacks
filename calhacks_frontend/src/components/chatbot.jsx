import * as React from "react";
import { Avatar, Typography, TextField, IconButton, Card, Stack, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/ChevronRight";

export default function chatbot(size, borderRadius, elevation) {
    return () => {
        return (
            <Card sx={{ width: "100%", height: "100%", borderRadius }} elevation={elevation}>
                <div>
                    <Box sx={{ paddingTop: '15%', paddingBottom: '15%' }}>
                        <Stack direction="row" spacing={1}>
                            <Avatar>B</Avatar>
                            <Typography variant="body1" sx={{ alignContent:"center"}}>
                                Hi! How can I assist you today?
                            </Typography>
                        </Stack>
                    </Box>
                </div>
                <div>
                   <Stack direction="row" spacing={1} sx={{ marginTop: '3%', height: '100%', marginLeft: '5%' }}>
                        <TextField sx={{ width: '100%', marginTop: '3%' }} label="Suggested Reply" variant="filled" multiline rows={3} />
                        <Box sx={{ aspectRatio: 1, paddingTop: '20%' }}>
                            <IconButton aria-label="send">
                                <SendIcon />
                            </IconButton>
                        </Box>
                    </Stack>
                </div>
            </Card>
        );
    }
};