import { IResponse } from "../../mainTypes";

export const LOGIN_FORM_EMAIL_CHANGE = "LOGIN_FORM_EMAIL_CHANGE";
export const LOGIN_FORM_PASSWORD_CHANGE = "LOGIN_FORM_PASSWORD_CHANGE";

export interface ILoginFormState {
    email: string;
    password: string;
}

export interface ILoginResponse extends IResponse {
    token?: string;
}

export interface IChangeEmail {
    type: typeof LOGIN_FORM_EMAIL_CHANGE;
    email: string;
}

export interface IChangePassword {
    type: typeof LOGIN_FORM_PASSWORD_CHANGE;
    password: string;
}

export type LoginFormActions = IChangeEmail | IChangePassword;
