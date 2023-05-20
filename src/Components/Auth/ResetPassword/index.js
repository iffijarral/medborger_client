import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";

// Material UI components
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

// Form validation
import { resetPasswordSchema } from 'src/Components/Validation/ResetpasswordValidation';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Util
import MySnackbar from 'src/Components/Util/SnackBar';

// Stylesheet
import 'src/Components/Auth/Styles.scss';

// To call APIs
import { postRequest } from 'src/Setup/AxiosClient';


export default function ResetPassword() {

    const [loading, setLoading] = useState(false);
    

    const { token } = useParams(); // Retrieve token sent by server         

    let snakkebarRef = useRef('');

    // This is for validation 
    const { register, handleSubmit, formState: { errors } } = useForm({

        resolver: yupResolver(resetPasswordSchema),
    });    
    
    // Calling handleSnakkebarAction function from snakkebar component 
    const snakkebarAction = (actionObject) => {

        snakkebarRef.current.handleSnakkebarAction(actionObject); // This function is in SnackBar.js

        // handleDialogClose()
    }

    // Submit form data to api 
    const submitForm = async (data, e) => {       
        
        const payload = {              
            password: e.target.password.value
        }
        
        try {
            setLoading(true)
            const response = await postRequest('users/save-password', payload, token);
            setLoading(false)
            if (response.status === 200) {
                               
                const snakkebarObject = {
                    severity: 'success',
                    message: 'Password saved successfully'
                }
                snakkebarAction(snakkebarObject)
                
            } else {
                
                const snakkebarObject = {
                    severity: 'error',
                    message: response.data.message
                }
                snakkebarAction(snakkebarObject)
            }           
            
        } catch (error) {
            console.log(error);
            const snakkebarObject = {
                severity: 'error',
                message: 'There was a problem while saving your password. Please try again later or contact the admin. Thanks!'
            }
            snakkebarAction(snakkebarObject)
        }


    };
  
    
    return (
        <div className="authContainer">            
            <MySnackbar ref={snakkebarRef} />
            <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
                <h2 style={{textAlign: 'center'}}>Reset Password </h2>
                
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

                <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    error={errors.confirmPassword ? true : false}
                    helperText={errors.confirmPassword?.message}
                    {...register("confirmPassword")}
                />
                
                <Button variant="outlined" className="btnLogin" type="submit" >{loading ? <CircularProgress /> : 'Reset Password'}</Button>                             

            </form>
        </div>
    );
}