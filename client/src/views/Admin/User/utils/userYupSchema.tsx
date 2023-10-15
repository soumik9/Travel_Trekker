import * as Yup from "yup";

export const userSchema = Yup.object().shape({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long'),
});

export const userUpdateSchema = Yup.object().shape({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .test('passwordValid', 'Password must be at least 6 characters long', function (value) {
            if (value && value.length > 0) {
                return value.length >= 6;
            }
            return true; // Validation is not applied when the field is empty
        }),
});