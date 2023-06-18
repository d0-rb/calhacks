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
        const [showEmail, setShowEmail] = React.useState(null);
        return (
            <Card sx={{ width: "100%", height: "100%", borderRadius}} elevation={elevation}>
                {!showEmail ? <ChatInformation size={size} answer={data.answer} borderRadius={borderRadius} elevation={elevation} setShowEmail={setShowEmail}/> : null}
                {showEmail ? <DisplayEmail size={size} from={data.emails[0].sender} subject={data.emails[0].subject} body={data.emails[0].body} setShowEmail={setShowEmail} /> : null}
            </Card>
        );
    }
};

function DisplayEmail({ from, subject, body, setShowEmail }) {
    const theme = useTheme();

    return (
        <>
            <Stack sx={{ zIndex: 1, position: 'relative', top: '0', left: '0'}} className="EmailDisplay">
                <Box sx={{ paddingTop: '4%', paddingLeft: '4%', paddingRight: '4%'}}>
                    <Typography sx={{ float: 'left' }} variant="h5" align="left" noWrap={true}>
                        {subject}
                    </Typography>
                    <IconButton sx={{ float: 'right' }} aria-label="close" onClick={() => {setShowEmail(null)}}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography sx={{ paddingLeft: '4%', paddingRight: '4%' }} variant="body1" align="left" noWrap={true} gutterBottom>
                    From: {from}
                </Typography>
                <Box sx={{ marginLeft: '4%', marginRight: '4%', marginTop: '2%', marginBottom: '4%', maxHeight: '40%', overflow: 'auto' }} elevation={4}>
                    <Typography variant="body2" align="left" gutterBottom>
                        {body}
                    </Typography>
                </Box>
            </Stack>
        </>
    );
}

function ChatInformation({size, answer, borderRadius, elevation, setShowEmail}) {
    const [sent, setSent] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    console.log(size);
    //{ paddingTop: '15%', paddingBottom: '15%' }
    return (
        <div>
            {size == 1 ? 
                <Box align="right" sx={{ paddingTop: '3%', paddingBottom: '2%', paddingRight:'4%'}}>
                    <IconButton variant="outlined" onClick={handleClickOpen}>
                        <LaunchIcon/>
                    </IconButton>
                    <CustomizedDialogs title={"ChatBot Response"} body={answer} open={open} setOpen={setOpen}/> 
                </Box>
                : null
            }
            <Box sx={{ paddingTop: '3%', paddingBottom: '3%', paddingRight:'5%', height:140, wordBreak: 'break-all'}}>
                <Stack sx={{ height: '100%' }} direction="row" spacing={1}>
                    <Avatar sx={{ marginLeft: '3%', marginRight: '3%'}}>B</Avatar>
                    <Typography variant="body1" align="left" sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                        }}>
                        {answer}
                    </Typography>
                </Stack>
            </Box>
            <Stack direction="row" spacing={1} sx={{ height: '100%', marginLeft: '5%'}}>
                <TextField sx={{ width: '100%', marginTop: '3%' }} label="Send Response" disabled={sent} variant="filled" multiline rows={1} />
                <Box sx={{ aspectRatio: 1, paddingTop: '10%' }}>
                    <IconButton aria-label="send" onClick={() => {setSent(true); setShowEmail(true);}}>
                        <SendIcon color="primary" />
                    </IconButton>
                </Box>
            </Stack>
        </div>
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

function CustomizedDialogs({title, body, open, setOpen}) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {title}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {body}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
