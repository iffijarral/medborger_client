// react & react-router-dom components
import React, { useState, useRef, useContext } from "react";
import { Link } from 'react-router-dom';

// Material UI components
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';

// Form validation
import { userSchema } from 'src/Components/Validation/UserValidation';
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Context manager
import { AuthContext } from 'src/Components/Contexts/AuthContext';

// Util
import MySnackbar from 'src/Components/Util/SnackBar';
// import * as myConstants from 'Constants';
import 'src/Components/Auth/Styles.scss';

// To call APIs
import { postRequest } from 'src/Setup/AxiosClient';

// import LoginLogic from "./LoginLogic";

 const LoginDialog = (props) => {

        const [loginLoading, setLoginLoading] = useState(false);

        const authContext = useContext(AuthContext);
              
        let snakkebarRef = useRef('');

        // This is for validation 
        const { register, reset, resetField, setFocus, handleSubmit, formState: { errors } } = useForm({

            resolver: yupResolver(userSchema),
        });        

        // Submit form data to api 
        const submitForm = async (formData, e) => {

            // Following part is executed when validation is passed.        

            const userData =
            {
                email: e.target.email.value,
                password: e.target.password.value,
                type: 'customer'
            }

            try { 
                // Show rotating loading icon
                setLoginLoading(true);

                // Authenticate user with his entered credentials
                const response = await postRequest('users/login', userData);                   
                
                if (response.status === 200) {

                    // Save state into auth context
                    authContext.setAuthState(response.data);
                    
                    const token = response.data.token;
                    console.log(token)
                    // Save token into cookie
                    authContext.setHTTPonlyCookie(token);

                    // Stop and hide rotating loading icon
                    setLoginLoading(false);

                    // close login dialog
                    handleDialogClose();                

                }
                else {

                    // call function to show snakkebar along with following data
                    const snakkebarObject = {
                        reason: 'error',
                        message: response.data.message
                    }

                    // Show snakkebar with given parameters
                    snakkebarAction(snakkebarObject)
                    
                    // close login dialog
                    setLoginLoading(false);
                }

                // Reset password input field
                resetField("password")

                // Set focus to password input field
                setFocus("password", { shouldSelect: true })

            } catch (error) {
                console.log(error);
            }

        };         

        const handleDialogClose = () => {
            // Reset form
            reset()
            
            // Close dialog
            props.onClick(); 
        }
        
        const handleSiblingDialogs = (e, action) => {

            e.preventDefault();

            if (action === 'register')
                props.openRegisterDialog();
            else
                props.openForgotPasswordDialog();
        }
        
        // Calling handleSnakkebarAction function from snakkebar component 
        const snakkebarAction = (actionObject) => {        
            snakkebarRef.current.handleSnakkebarAction(actionObject); // This function is in SnackBar.js
        }

    return (

        <>
            <Dialog open={props.open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{ textAlign: 'center', color: 'white' }}>
                    Login
                    <div className="closeDialog">
                        <HighlightOffIcon onClick={handleDialogClose} />
                    </div>
                </DialogTitle>
                <DialogContent>

                    <div className="authContainer">
                        <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
                            <TextField
                                error={errors.email ? true : false}
                                name="email"
                                id="email"
                                label="Email"
                                variant="outlined"
                                autoFocus
                                helperText={errors.email?.message}
                                {...register("email")}
                            />

                            <TextField

                                error={errors.password ? true : false}                                
                                name="password"
                                id="password"
                                type="password"
                                label="Password"
                                variant="outlined"
                                helperText={errors.password?.message}
                                {...register("password")}
                            />

                            <Button variant="outlined" className="btnLogin" type="submit" >{loginLoading ? <CircularProgress /> : 'Login'} </Button>

                            <MySnackbar ref={snakkebarRef} />

                            <div className="register">
                                <Link
                                    to="#"
                                    className="forgot-password"
                                    onClick={(event) => { handleSiblingDialogs(event, 'forgotPassword'); }}
                                >
                                    Forgot Password ?

                                </Link>
                                <Link
                                    to="#"
                                    onClick={(event) => { handleSiblingDialogs(event, 'register'); }}
                                >
                                    Register here
                                </Link>
                            </div>

                        </form>
                    </div>
                </DialogContent>

            </Dialog>
        </>
    );
}

export default LoginDialog