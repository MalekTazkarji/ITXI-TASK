import React from "react";
import { Alert, Snackbar } from "@mui/material";

const  NotificationBar = (props) => {
  const { notify, setNotify } = props;
  //   const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false
    })
  }

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert
        variant="filled"
        color={notify.type}
        onClose={handleClose}
      >{notify.message}</Alert>
    </Snackbar>
  );
}

export default NotificationBar;