import * as yup from 'yup';

export const changePasswordSchema = yup.object().shape({            
    currentPassword: yup.string().required("It is a required field").min(4).max(20),
    newPassword: yup.string().required("It is a required field").min(4).max(20),
    confirmPassword: yup.string().required("It is a required field").oneOf([yup.ref("newPassword"), null], "passwords don't match")

});