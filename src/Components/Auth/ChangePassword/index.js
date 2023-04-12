import React, { useState, useRef, useContext } from "react";
import { Navigate } from "react-router-dom"
// Material UI components
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';

// Form validation
import { changePasswordSchema } from 'src/Components/Validation/ChangePasswordValidation';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Context manager
import { AuthContext } from 'src/Components/Contexts/AuthContext';

// Util
import MySnackbar from 'src/Components/Util/SnackBar';

// Stylesheet
import 'src/Components/Auth/Styles.scss';

// To call APIs
import { putRequest } from 'src/Setup/AxiosClient';

export default function ChangePasswordDialog(props) {

    const [loading, setLoading] = useState(false);
    const [redirectOnPasswordChanged, setRedirectOnPasswordChanged] = useState(false);    
    
    // To get logged user data
    var contextUser = useContext(AuthContext);
    const authState = contextUser.authState;

    // To handle snackbar
    let snakkebarRef = useRef(''); 

    // This is for validation 
    const { register, reset, handleSubmit, formState: { errors } } = useForm({

        resolver: yupResolver(changePasswordSchema),
    });

    // Submit form data to api 
    const submitForm = async (data, e) => {
        
        if (authState.status) 
        {                                    
            const payload = {                
                currentPassword: e.target.currentPassword.value,
                newPassword: e.target.newPassword.value,
                userID: authState.id,
                email: authState.email                
            }

            setLoading(true);

            try 
            {
                
                const response = await putRequest('users/reset-password', payload, authState.token);
                
                setLoading(false);
                
                if (response.status === 200) 
                {

                    const snakkebarObject = {
                        severity: 'success',
                        message: 'Password changed successfully'
                    }
                    snakkebarAction(snakkebarObject)

                } 
                else 
                {

                    const snakkebarObject = {
                        reason: 'error',
                        message: response.data.message
                    }
                    snakkebarAction(snakkebarObject)
                }                

            } 
            catch (error) 
            {
                console.log(error);
                const snakkebarObject = {
                    reason: 'error',
                    message: 'There was an error, please try again later or contact admin'
                }
                snakkebarAction(snakkebarObject)
            }

        }
        else 
        {
            const snakkebarObject = {
                severity: 'info',
                message: 'You are not logged in'
            }
            snakkebarAction(snakkebarObject)
        }
        
    };

    const handleDialogClose = () => {
        
        reset();        
        
        props.onClick(); // to close dialog

        setRedirectOnPasswordChanged(true);
    }

    // Calling handleSnakkebarAction function from snakkebar component 
    const snakkebarAction = (actionObject) => {

        snakkebarRef.current.handleSnakkebarAction(actionObject); // This function is in SnackBar.js

        // handleDialogClose()
    }

    return (
        <>
        {/* {redirectOnPasswordChanged && <Navigate replace to="/" />} */}
        <MySnackbar ref={snakkebarRef} />
        <Dialog open={props.open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{ textAlign: 'center', color: 'white' }}>
                Change Password
                <div className="closeDialog">
                    <HighlightOffIcon onClick={handleDialogClose}  />
                </div>
            </DialogTitle>
            <DialogContent>
                
                <div className="authContainer">
                    <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
                        <TextField
                            autoFocus={true}
                            error={errors.currentPassword ? true : false}                            
                            name="currentPassword"
                            id="currentPassword"
                            type="password"
                            label="Current Password"
                            variant="outlined"
                            helperText={errors.currentPassword?.message}
                            {...register("currentPassword")}
                        />

                        <TextField

                            id="newPassword"
                            name="newPassword"
                            type="password"
                            label="New Password"
                            variant="outlined"
                            error={errors.newPassword ? true : false}
                            helperText={errors.newPassword?.message}
                            {...register("newPassword")}
                        />

                        <TextField

                            error={errors.confirmPassword ? true : false}                            
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            variant="outlined"
                            helperText={errors.confirmPassword?.message}
                            {...register("confirmPassword")}
                        />
                        <Button variant="outlined" className="btnLogin" type="submit" > {loading ? <CircularProgress /> : 'Change Password' } </Button>                        
                    </form>
                </div>
            </DialogContent>
            {/* <DialogActions>

            </DialogActions> */}
        </Dialog>
        </>

    );
}