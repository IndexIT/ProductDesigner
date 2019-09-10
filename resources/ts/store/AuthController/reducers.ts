import {
    AUTH_CONTROLLER_GUEST_ACCESS,
    AUTH_CONTROLLER_LOADING,
    AUTH_CONTROLLER_USER_ACCESS,
    AuthControllerActions,
    IAuthControllerState
} from "./types";

const initialState: IAuthControllerState = {
    loading: true
};

export default (
    state = initialState,
    action: AuthControllerActions
): IAuthControllerState => {
    switch (action.type) {
        case AUTH_CONTROLLER_GUEST_ACCESS:
            return {
                ...state,
                loading: false,
                user: undefined
            };
        case AUTH_CONTROLLER_USER_ACCESS:
            return {
                ...state,
                loading: false,
                user: action.user
            };
        case AUTH_CONTROLLER_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};
