import * as React from "react";
import { Avatar, Typography, TextField, Button, Card } from "@mui/material";

export default function chatbot(size, borderRadius, elevation) {
    return () => {
        return (
            <Card sx={{ width: "100%", height: "100%", borderRadius }} elevation={elevation}>
                <div>
                    <Avatar>B</Avatar>
                    <Typography variant="body1">
                        Hi! How can I assist you today?
                    </Typography>
                    </div>
                    <div>
                    <TextField label="Type your message" variant="outlined" />
                    <Button variant="contained" color="primary">
                        Send
                    </Button>
                </div>
            </Card>
        );
    }
};