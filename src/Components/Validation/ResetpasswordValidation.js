import * as yup from 'yup';

export const resetPasswordSchema = yup.object().shape({            
    password: yup.string().min(4).max(20).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "passwords don't match").required()
});