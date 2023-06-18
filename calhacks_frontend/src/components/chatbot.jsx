import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  botAvatar: {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
  userAvatar: {
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  messageText: {
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[300],
  },
}));

const chatbot = ({ message, isBot }) => {
  const classes = useStyles();

  return (
    <div className={classes.messageContainer}>
      {isBot ? (
        <Avatar className={classes.botAvatar}>B</Avatar>
      ) : (
        <Avatar className={classes.userAvatar}>U</Avatar>
      )}
      <Typography
        variant="body1"
        component="div"
        className={classes.messageText}
      >
        {message}
      </Typography>
    </div>
  );
};

export default chatbot;
