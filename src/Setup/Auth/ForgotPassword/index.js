import React, { useState, useRef, Fragment } from "react";
import { Link } from "react-router-dom";

// Material UI components
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';

// Form validation
import { forgotPasswordSchema } from 'src/Setup/Validation/ForgotPasswordValidation';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Util
import MySnackbar from 'src/Setup/Util/SnackBar';

// Stylesheet
import 'src/Setup/Auth/Styles.scss';

// To call APIs
import { postRequest } from 'src/Setup/AxiosClient';

export default function ForgotPasswordDialog(props) {

    const [loading, setLoading] = useState(false);    

    const { register, reset, handleSubmit, formState: { errors } } = useForm({

        resolver: yupResolver(forgotPasswordSchema),
    });

    let snakkebarRef = useRef('');

    // Submit form data to api 
    const submitForm = async (data, e) => {

        const payload = {
            email: e.target.email.value
        }

        try {

            setLoading(true);

            const response = await postRequest('users/forgot-password', payload); // Send an email                             

            setLoading(false);

            if (response.status === 200) {
                const snakkebarObject = {
                    severity: 'success',
                    message: response.data.message
                }
                snakkebarAction(snakkebarObject)

            }
            else {
                // call function to show snakkebar along with following data
                const snakkebarObject = {
                    reason: 'error',
                    message: response.data.message
                }
                snakkebarAction(snakkebarObject)
            }

        }
        catch (error) {
            console.log(error);
            // call function to show snakkebar along with following data
            const snakkebarObject = {
                reason: 'error',
                message: 'There was a problem, please try again later or contact with admin. Thanks'
            }
            snakkebarAction(snakkebarObject)
        }


    };

    const handleDialogClose = () => {

        reset();

        props.onClick(); // to close dialog
    }

    const handleSiblingDialogs = (e) => {

        e.preventDefault();

        props.openLoginDialog();
    }

    // Calling handleSnakkebarAction function from snakkebar component 
    const snakkebarAction = (actionObject) => {

        snakkebarRef.current.handleSnakkebarAction(actionObject); // This function is in SnackBar.js

        // handleDialogClose()
    }

    return (
        <Fragment>
            <MySnackbar ref={snakkebarRef} />

            <Dialog open={props.open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{ textAlign: 'center', color: 'white' }}>
                    Fotgot Password
                    <div className="closeDialog">
                        <HighlightOffIcon onClick={props.onClick} />
                    </div>
                </DialogTitle>
                <DialogContent>

                    <div className="authContainer">
                        <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
                            <TextField
                                error={errors.email ? true : false}
                                id="email"
                                name="email"
                                label="Email"
                                variant="outlined"
                                color="primary"
                                autoFocus
                                helperText={errors.email?.message}
                                {...register("email")}
                            />

                            <Button variant="outlined" className="btnLogin" type="submit" > {loading ? <CircularProgress /> : 'Send Email'}</Button>
                            <div className="register">
                                <Link to="#" onClick={handleSiblingDialogs}>Back to login</Link>
                            </div>

                        </form>

                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}