import { IResponse } from "../../mainTypes";

export const REGISTER_FORM_CHANGE_EMAIL = "REGISTER_FORM_CHANGE_EMAIL";
export const REGISTER_F0RM_CHANGE_PASSWORD = "REGISTER_F0RM_CHANGE_PASSWORD";
export const REGISTER_FORM_CHANGE_PASSWORD_CONFIRMATION =
    "REGISTER_FORM_CHANGE_PASSWORD_CONFIRMATION";
export const REGISTER_FORM_SUBMITED = "REGISTER_FORM_SUBMITED";

export interface IRegisterFormState {
    email: string;
    password: string;
    passwordConfirmation: string;
    userId?:number;
}

export interface IRegisterResponse extends IResponse {
    userId?: number;
}

export interface IChangeEmail {
    type: typeof REGISTER_FORM_CHANGE_EMAIL;
    email: string;
}

export interface IChangePassword {
    type: typeof REGISTER_F0RM_CHANGE_PASSWORD;
    password: string;
}

export interface IChangePasswordConfirmation {
    type: typeof REGISTER_FORM_CHANGE_PASSWORD_CONFIRMATION;
    passwordConfirmation: string;
}

export interface ISubmitedForm {
    type: typeof REGISTER_FORM_SUBMITED;
    userId: number;
}

export type RegisterFormActions =
    | IChangeEmail
    | IChangePassword
    | IChangePasswordConfirmation
    | ISubmitedForm;
