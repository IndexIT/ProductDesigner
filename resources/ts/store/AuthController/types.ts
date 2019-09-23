import { IResponse } from "../../mainTypes";

export const AUTH_CONTROLLER_GUEST_ACCESS = "AUTH_CONTROLLER_GUEST_ACCESS";
export const AUTH_CONTROLLER_USER_ACCESS = "AUTH_CONTROLLER_USER_ACCESS";
export const AUTH_CONTROLLER_LOADING = "AUTH_CONTROLLER_LOADING";

export interface IUser {
    id: number;
    name: string;
    avatar: string | number;
    email: string;
    type: string;
}

export interface IAuthControllerState {
    user?: IUser;
    loading: boolean;
}

export interface IUserResponse extends IResponse {
    user?: IUser;
}

export interface ILoginResponse extends IResponse {
    token?: string;
}

export interface IGuestAccess {
    type: typeof AUTH_CONTROLLER_GUEST_ACCESS;
}

export interface IUserAccess {
    type: typeof AUTH_CONTROLLER_USER_ACCESS;
    user: IUser;
}

export interface ILoading {
    type: typeof AUTH_CONTROLLER_LOADING;
}

export type AuthControllerActions = IGuestAccess | IUserAccess | ILoading;
