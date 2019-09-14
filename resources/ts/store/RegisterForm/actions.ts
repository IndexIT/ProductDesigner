import {
    IChangeEmail,
    IChangePassword,
    IChangePasswordConfirmation,
    REGISTER_F0RM_CHANGE_PASSWORD,
    REGISTER_FORM_CHANGE_EMAIL,
    REGISTER_FORM_CHANGE_PASSWORD_CONFIRMATION
} from "./types";

export const changeEmail = (email: string): IChangeEmail => ({
    email,
    type: REGISTER_FORM_CHANGE_EMAIL
});

export const changePassword = (password: string): IChangePassword => ({
    password,
    type: REGISTER_F0RM_CHANGE_PASSWORD
});

export const changePasswordConfirmation = (
    passwordConfirmation: string
): IChangePasswordConfirmation => ({
    passwordConfirmation,
    type: REGISTER_FORM_CHANGE_PASSWORD_CONFIRMATION
});
