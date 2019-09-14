import {
    IChangeEmail,
    IChangePassword,
    LOGIN_FORM_EMAIL_CHANGE,
    LOGIN_FORM_PASSWORD_CHANGE
} from "./types";

export const changeEmail = (email: string): IChangeEmail => ({
    email,
    type: LOGIN_FORM_EMAIL_CHANGE
});

export const changePassword = (password: string): IChangePassword => ({
    password,
    type: LOGIN_FORM_PASSWORD_CHANGE
});