import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import agent from "../../agent";
import { errorSnack, successSnack } from "../SnackController/actions";
import {
    IChangeEmail,
    IChangePassword,
    IChangePasswordConfirmation,
    ISubmitedForm,
    REGISTER_F0RM_CHANGE_PASSWORD,
    REGISTER_FORM_CHANGE_EMAIL,
    REGISTER_FORM_CHANGE_PASSWORD_CONFIRMATION,
    REGISTER_FORM_SUBMITED
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

export const submited = (userId: number): ISubmitedForm => ({
    type: REGISTER_FORM_SUBMITED,
    userId
});

export const submit = (
    email: string,
    password: string,
    passwordConfirmation: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    agent.authController
        .register(email, password, passwordConfirmation)
        .then(({ success, message, userId }) => {
            if (success) {
                if (message) {
                    dispatch(successSnack(message));
                }

                if (userId) {
                    dispatch(submited(userId));
                }
            } else if (message) {
                dispatch(errorSnack(message));
            }
        });
};

export const emailAgain = (
    userId:number
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    agent.authController.emailConfirmation(userId).then(({success,message})=>{
        if(success&&message){
            dispatch(successSnack(message));
        } else if(message){
            dispatch(successSnack(message));
        }
    });
};