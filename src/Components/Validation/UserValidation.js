import * as yup from 'yup';

export const userSchema = yup.object().shape({    
    email: yup.string().email().required("Please give a valid email address"),
    password: yup.string().min(4).max(20).required()
});