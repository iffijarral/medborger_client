import * as yup from 'yup';

export const userRegisterSchema = yup.object().shape({    
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.number().typeError('It must be a number').required("this is required"),
    password: yup.string().min(4).max(20).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "passwords don't match")
});