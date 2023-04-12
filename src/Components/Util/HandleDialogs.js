import React, { Fragment, forwardRef, useImperativeHandle, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
// Custom components
import ChangePasswordDialog from 'src/Components/Auth/ChangePassword';
import LoginDialog from 'src/Components/Auth/Login';
import RegisterDialog from 'src/Components/Auth/Register';
import ForgotPasswordDialog from 'src/Components/Auth/ForgotPassword';

import { AuthContext } from 'src/Components/Contexts/AuthContext';

const HandleDialogs = forwardRef((props, ref) => {

    const authContext = useContext(AuthContext);

    //Change Password Dialog
    const [changePasswordState, setChangePasswordState] = useState(false);

    //login dialog
    const [loginDialog, setLoginDialogState] = useState(false);

    //Register Dialog
    const [registerDialog, setRegisterDialogState] = useState(false);

    //Forgot Password
    const [forgotPasswordDialog, setForgotPasswordDialogState] = useState(false);

    const navigate = useNavigate();
    // Implement this to call function(s) from parent component(s)
    useImperativeHandle(ref, () => ({

        handleAction(action) { // This is being called from parent component(s) 

            switch (action) {
                case "Change Password":
                    setChangePasswordState(true);
                    break
                case "Login":
                    setLoginDialogState(true);
                    break
                case "Register":
                    setRegisterDialogState(true);
                    break
                case "Statistics":
                    navigate('/statistics');
                    break
                default:
                    authContext.logout();

            }
            
        }
    }))



    const handleChangeClosePasswordDialog = () => {

        setChangePasswordState(false);
    };

    const handleLoginCloseDialog = () => {

        setLoginDialogState(false);
        
    };

    const handleRegisterDialogClose = () => {

        setRegisterDialogState(false);

    };

    const handleRegisterDialogOpen = () => {

        setRegisterDialogState(true);

        handleLoginCloseDialog();
    };

    const handleLoginDialogState = () => {

        if (loginDialog)
            setLoginDialogState(false);
        else
            setLoginDialogState(true);

        setRegisterDialogState(false);

        setForgotPasswordDialogState(false);

    }

    const handleForgotPasswordDialog = () => {

        if (forgotPasswordDialog) {
            setForgotPasswordDialogState(false);
        }
        else {
            setForgotPasswordDialogState(true);
        }

        setLoginDialogState(false);
    }

    return (
        <Fragment>
            <LoginDialog open={loginDialog} openForgotPasswordDialog={handleForgotPasswordDialog} openRegisterDialog={handleRegisterDialogOpen} onClick={handleLoginCloseDialog} toLocation='/' />
            <RegisterDialog open={registerDialog} openLoginDialog={handleLoginDialogState} onClick={handleRegisterDialogClose} toLocation="/" />
            <ForgotPasswordDialog open={forgotPasswordDialog} openLoginDialog={handleLoginDialogState} onClick={handleForgotPasswordDialog} />
            <ChangePasswordDialog open={changePasswordState} onClick={handleChangeClosePasswordDialog} />
        </Fragment>
    )
})

export default HandleDialogs