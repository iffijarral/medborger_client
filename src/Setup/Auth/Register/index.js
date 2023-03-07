import React, { useContext, useRef, Fragment } from "react";
import { useNavigate, Link } from "react-router-dom";

// Material UI components
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';

// Form validation
import { userRegisterSchema } from 'src/Setup/Validation/RegisterFormValidation';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Context manager
import { AuthContext } from 'src/Setup/Contexts/AuthContext';

// Util
import MySnackbar from 'src/Setup/Util/SnackBar';

// Stylesheet
import 'src/Setup/Auth/Styles.scss';

// To call APIs
import { postRequest } from 'src/Setup/AxiosClient';

export default function RegisterDialog(props) {

    const navigate = useNavigate();   

    const authContext = useContext(AuthContext);

    const { register, reset, handleSubmit, formState: { errors } } = useForm({

        resolver: yupResolver(userRegisterSchema),
    });

    let snakkebarRef = useRef('');

    // Data handler on form submit
    const submitForm = async (data, e) => {

        const userData = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: '' + e.target.phone.value,
            password: e.target.password.value,
            type: 'customer',
            status: false
        }

        try {
            const response = await postRequest('users/', userData); 

            if (response.status === 201) {

                authContext.setAuthState(response.data);

                authContext.saveCookie(response.data);

                const msg = props.toLocation ? 'User created successfully' : 'User created, Please login to proceed.';

                const snakkebarObject = {
                    severity: 'success',
                    message: msg
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
        }

    };

    const handleDialogClose = () => {
        reset();
        props.onClick(); // to close dialog
        navigate(props.toLocation)
    };

    const handleSiblingDialogs = (e) => {

        e.preventDefault();

        props.openLoginDialog();
    }

    // Calling handleSnakkebarAction function from snakkebar component 
    const snakkebarAction = (actionObject) => {

        snakkebarRef.current.handleSnakkebarAction(actionObject); // This function is in SnackBar.js

        handleDialogClose()
    }

    return (
        <Fragment>
            <MySnackbar ref={snakkebarRef} />
            <Dialog open={props.open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{ textAlign: 'center', color: 'white' }}>
                    Register New User
                    <div className="closeDialog">
                        <HighlightOffIcon onClick={handleDialogClose} />
                    </div>
                </DialogTitle>
                <DialogContent>

                    <div className="authContainer">
                        <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
                            <TextField
                                id="name"
                                name="name"
                                label="Full name"
                                variant="outlined"
                                autoFocus
                                error={errors.name ? true : false}
                                helperText={errors.name?.message}
                                {...register("name")}
                            />
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                variant="outlined"
                                error={errors.email ? true : false}
                                helperText={errors.email?.message}
                                {...register("email")}
                            />
                            <TextField
                                id="phone"
                                name="phone"
                                label="Phone"
                                variant="outlined"
                                error={errors.phone ? true : false}
                                helperText={errors.phone?.message}
                                {...register("phone")}
                            />
                            <TextField
                                id="password"
                                name="password"
                                type="password"
                                label="Password"
                                variant="outlined"
                                error={errors.password ? true : false}
                                helperText={errors.password?.message}
                                {...register("password")}
                            />
                            <TextField
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                label="ConfirmPassword"
                                variant="outlined"
                                error={errors.confirmPassword ? true : false}
                                helperText={errors.confirmPassword?.message}
                                {...register("confirmPassword")}
                            />

                            <Button variant="outlined" className="btnLogin" type="submit" >Register</Button>
                            <div className="register">
                                <p>Do you have an account? <Link to="#" onClick={handleSiblingDialogs}> Login here</Link> </p>
                            </div>

                        </form>
                    </div>
                </DialogContent>

            </Dialog>
        </Fragment>
    );
}