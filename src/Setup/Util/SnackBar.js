import React, { forwardRef, useImperativeHandle, useState } from 'react'

// Mui components
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material'
import { makeStyles } from '@mui/styles';

// function Alert(props) {
//   console.log("in snackbar alert")
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const MySnackbar = forwardRef((props, ref) => {

  // Following three statements are to control snakkebar
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [msg, setMsg] = useState("");

  // This is to handle snakkebar for msgs.
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const showSnakkebar = (severity) => {

    setOpen(true);

    setSeverity(severity);   

  }

  // Implement this to call function(s) from parent component(s)
  useImperativeHandle(ref, () => ({

    handleSnakkebarAction(snakkebarAction) { // This is being called from parent component(s)             
      
      showSnakkebar(snakkebarAction.severity)
      
      setMsg(snakkebarAction.message)
      
    }
  }))

  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert elevation={6} onClose={handleClose} severity={severity}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
})

export default MySnackbar