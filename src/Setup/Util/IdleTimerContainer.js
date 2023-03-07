import React, { useContext, useEffect } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Fragment, useState } from "react";
import { useIdleTimer } from "react-idle-timer";

import { AuthContext } from 'src/Setup/Contexts/AuthContext';

const UseIdle = ({ idleTime = 1 }) => {
    const [alive, setAlive] = useState(false);
    const [open, setOpen] = useState(false)

    const authContext = useContext(AuthContext);

    let timeOut;

    useEffect(() => {
        if (open && !alive) {
            timeOut = setTimeout(logOut, 5000)
        }
        return () => {
            clearTimeout(timeOut); // cleanup
        };
    }, [open, alive])

    const handleOnIdle = event => { // This function is called automatically when idle time reaches to its limit

        if (authContext.authState.status) { // If user is logged in           
            setOpen(true) // Open Dialog
            setAlive(false) // Reset to its initial state.            
        }
    }

    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout: 1000 * 60 * idleTime,
        onIdle: handleOnIdle,
        debounce: 500
    })

    const logOut = () => {

        if (!alive) {
            setOpen(false)
            if (authContext.authState.status) { // If user is logged in            
                authContext.logout()
            }
        }

    }

    const handleOnClose = async (action) => {

        if (action === 'logout') {
            setAlive(false)
            logOut()
        } else {
            setAlive(prevState => { return !prevState })
        }

        setOpen(false)
    }

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={() => handleOnClose('logout')}
            >
                <DialogTitle style={{ color: 'white', textAlign: 'left' }}>Still using this app ?</DialogTitle>
                <DialogContent style={{ paddingTop: '1em' }}>

                    You've been idle for a while, You will be logged out soon.

                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => handleOnClose('Keep Alive')}>Keep Alive</Button>
                    <Button variant="contained" onClick={() => handleOnClose('logout')}>Logout</Button>
                </DialogActions>
            </Dialog>
        </Fragment>

    )
}

export default UseIdle;
