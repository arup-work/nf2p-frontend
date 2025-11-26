import * as yup from 'yup';

const NAME = (type = 'Name') => {
    yup
        .string().max(255, `${type} should have maximum 255 character`)
        .matches(
            /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/,
            `${type} should not contains numbers, spaces at first character & special characters`
        )
        .required(`${type} is required`)
}

const EMAIL = yup
    .string().matches(
        /^[+\w-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        'Enter a valid email'
    )
    .required('Email is required')
    .max(150, 'Email must be maximum 150 characters');


const LOGIN_PASSWORD = yup.string().required('Password is required');

const REGISTER_PASSWORD = yup
    .string()
    .matches(/.{6,15}$/, 'Password must be minimum 6 and maximum 15 characters')
    .required('Password is required');

export const LoginValidator = yup.object({
    email: EMAIL,
    Password: LOGIN_PASSWORD
})

export const RegisterValidator = yup.object({
    name: NAME(),
    email: EMAIL,
    password: REGISTER_PASSWORD
})

