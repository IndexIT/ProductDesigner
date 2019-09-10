import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import agent from "../../agent";
import {
    AUTH_CONTROLLER_GUEST_ACCESS,
    AUTH_CONTROLLER_LOADING,
    AUTH_CONTROLLER_USER_ACCESS,
    IGuestAccess,
    IUser,
    IUserAccess
} from "./types";

export const guestAccess = (): IGuestAccess => ({
    type: AUTH_CONTROLLER_GUEST_ACCESS
});

export const userAccess = (user: IUser): IUserAccess => ({
    type: AUTH_CONTROLLER_USER_ACCESS,
    user
});

export const loading = () => ({
    type: AUTH_CONTROLLER_LOADING
});

export const fetchUser = (): ThunkAction<
    Promise<void>,
    {},
    {},
    AnyAction
> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(loading());
    agent.authController.userInfo().then(({ user, success }) => {
        if (success && user) {
            dispatch(userAccess(user));
        } else {
            dispatch(guestAccess());
        }
    });
};
