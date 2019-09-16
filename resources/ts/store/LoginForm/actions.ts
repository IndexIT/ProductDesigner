import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import agent from "../../agent";
import { APP_URL, USER_TOKEN_KEY } from "../../config";
import { errorSnack, successSnack } from "../SnackController/actions";
import {
    IChangeEmail,
    IChangePassword,
    IClearForm,
    LOGIN_FORM_CLEAR_FORM,
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

export const clearForm = (): IClearForm => ({
    type: LOGIN_FORM_CLEAR_FORM
});

export const login = (
    email: string,
    password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    agent.authController
        .login(email, password)
        .then(({ message, success, token }) => {
            if (success) {
                dispatch(clearForm());
                if (message) {
                    dispatch(successSnack(message));
                }
                if (token) {
                    window.setTimeout(() => {
                        localStorage.setItem(USER_TOKEN_KEY, token);
                    }, 3000);
                }

                if(APP_URL){
                    window.location.href = APP_URL;
                }
            } else if (message) {
                dispatch(errorSnack(message));
            }
        });
};
