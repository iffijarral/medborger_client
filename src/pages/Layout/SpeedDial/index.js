// react & react-router-dom components
import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

// MUI components
import { makeStyles } from '@mui/styles';
import SpeedDial from '@mui/lab/SpeedDial';
import SpeedDialAction from '@mui/lab/SpeedDialAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

// Custom components
import ChangePasswordDialog from 'src/Setup/Auth/ChangePassword';
import LoginDialog from 'src/Setup/Auth/Login';
import RegisterDialog from 'src/Setup/Auth/Register';
import ForgotPasswordDialog from 'src/Setup/Auth/ForgotPassword';

// Context manager
import { AuthContext } from 'src/Setup/Contexts/AuthContext';

// Utility
import { DeviceSize } from "src/Setup/Util/DeviceSize";

const useStyles = makeStyles((theme) => ({
    root: {
        transform: 'translateZ(0px)',
        flexGrow: 1,
    },

    exampleWrapper: {
        position: 'relative',
        marginTop: theme.spacing(-2),
        height: 0,
    },
    
    buttonClass: {
        backgroundColor: '#056aa8',        
        minHeight: 0,
        width: '40px',
        height: '40px',
        "&:hover": {
            backgroundColor: 'salmon',
        }
    },
    mobileButtonClass: {
        backgroundColor: '#056aa8',        
        minHeight: 0,
        width: '30px',
        height: '30px',
        "&:hover": {
            backgroundColor: 'salmon',
        }
    },
       
}));

export default function SpeedDials() {
    
    const classes = useStyles();

    var authContext = useContext(AuthContext);
    
    const authState = authContext.authState;    

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    //Change Password Dialog
    const [changePasswordState, setChangePasswordState] = useState(false);

    //login dialog
    const [loginDialog, setLoginDialogState] = useState(false);

    //Register Dialog
    const [registerDialog, setRegisterDialogState] = useState(false);

    //Forgot Password
    const [forgotPasswordDialog, setForgotPasswordDialogState] = useState(false);

    const handleChangeClosePasswordDialog = () => {

        setChangePasswordState(false);

        handleClose();
    };

    const handleLoginCloseDialog = () => {

        setLoginDialogState(false);

        handleClose();
    };

    const handleRegisterDialogClose = () => {

        setRegisterDialogState(false);

        handleClose();
    };

    const handleRegisterDialogOpen = () => {

        setRegisterDialogState(true);

        handleLoginCloseDialog();
    };

    const handleLoginDialogState = () => {

        if(loginDialog) 
            setLoginDialogState(false);
        else
            setLoginDialogState(true);

        setRegisterDialogState(false);

        setForgotPasswordDialogState(false);
        
    }

    const handleForgotPasswordDialog = () => {
        
        if (forgotPasswordDialog) 
        {            
            setForgotPasswordDialogState(false);
        }            
        else 
        {            
            setForgotPasswordDialogState(true);
        }
            
        setLoginDialogState(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleAction = (event, action) => {

        if (action === 'Change Password') 
        {
            setOpen(false);
            setChangePasswordState(true);

        }
        else if (action === 'Login') 
        {
            setOpen(false);
            setLoginDialogState(true);
        }
        else if (action === 'Register') 
        {
            setOpen(false);
            setRegisterDialogState(true);
        }
        else if(action === 'Statistics') 
        {
            
            navigate('/statistics');
        }
        else if(action === 'Logout') 
        {
            setOpen(false);
            authContext.logout();
        }
    }

    let actions;

    if (authState.status) 
    {
        actions = [
            { icon: <EditOutlinedIcon />, name: 'Change Password' },
            { icon: <TableChartOutlinedIcon />, name: 'Statistics' },
            { icon: <LockOutlinedIcon />, name: 'Logout' },
        ];
    }
    else 
    {
        actions = [
            { icon: <LockOpenIcon />, name: 'Login' },
            { icon: <PersonAddOutlinedIcon />, name: 'Register' },
        ];
    }

    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

    return (
        <div className={classes.root}>

            <div className={classes.exampleWrapper}>
                <SpeedDial
                    ariaLabel="SpeedDial example"                    
                    classes={{ fab: isMobile ? classes.mobileButtonClass : classes.buttonClass }}
                    icon={<AccountCircleIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                    direction='down'

                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={(event) => { handleAction(event, action.name); }}
                        />
                    ))}
                </SpeedDial>
                <LoginDialog open={loginDialog} openForgotPasswordDialog={handleForgotPasswordDialog} openRegisterDialog={handleRegisterDialogOpen} onClick={handleLoginCloseDialog} toLocation='/' />
                <RegisterDialog open={registerDialog} openLoginDialog={handleLoginDialogState} onClick={handleRegisterDialogClose} toLocation="/" />
                <ForgotPasswordDialog open={forgotPasswordDialog} openLoginDialog={handleLoginDialogState} onClick={handleForgotPasswordDialog} />
                <ChangePasswordDialog open={changePasswordState} onClick={handleChangeClosePasswordDialog} />

            </div>
        </div>
    );
}