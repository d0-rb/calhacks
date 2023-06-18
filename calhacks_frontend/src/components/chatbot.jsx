import * as React from "react";
import { Avatar, Typography, TextField, IconButton, Card, Stack, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import LaunchIcon from "@mui/icons-material/Launch";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";


export default function chatbot(size, borderRadius, elevation) {
    return ({ data }) => {
        return (
            <Card sx={{ width: "100%", height: "100%", borderRadius}} elevation={elevation}>
                <ChatInformation size={size} answer={data.answer} emails={data.emails} borderRadius={borderRadius} elevation={elevation}/>
            </Card>
        );
    }
};

function ChatInformation({ size, answer, emails, borderRadius, elevation }) {
    const [sent, setSent] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    
    return (
        <Stack sx={{ padding: '5%', height: '90%', width: '90%' }} spacing={1}>
            <TextField label="Email Search" disabled={sent} type="search" variant="standard" />
            <Box overflow="auto">
                <Typography variant="body1" align="left">
                    {answer}
                </Typography>
                <IconButton sx={{ float: 'left' }} aria-label="open-sources" onClick={() => {setOpen(true)}}>
                    <LaunchIcon color="primary" />
                </IconButton>
                <Typography sx={{ float: 'left', paddingTop: '2.5%', paddingLeft: '2%' }} color="primary" variant="body1" align="left">
                    Sources
                </Typography>
                <CustomizedDialogs title={"Email Sources"} emails={emails} open={open} setOpen={setOpen}/> 
            </Box>
        </Stack>
    );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton aria-label="close" onClick={onClose} sx={{position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500],}}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function CustomizedDialogs({title, emails, open, setOpen}) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={{ width: '100%' }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {title}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {emails.map((email) => (
                        <>
                            <Typography variant="h6" color="primary" noWrap={true}>
                                {email.subject}
                            </Typography>
                            <Typography noWrap={true}>
                                {email.sender}
                            </Typography>
                            <Typography gutterBottom noWrap={true}>
                                {(new Date(Date.parse(email.date))).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}
                            </Typography>
                        </>
                    ))}
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}
