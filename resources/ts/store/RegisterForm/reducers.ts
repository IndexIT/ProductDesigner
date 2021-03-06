import {
    IRegisterFormState,
    REGISTER_F0RM_CHANGE_PASSWORD,
    REGISTER_FORM_CHANGE_EMAIL,
    REGISTER_FORM_CHANGE_PASSWORD_CONFIRMATION,
    REGISTER_FORM_SUBMITED,
    RegisterFormActions,
} from "./types";

const initialState: IRegisterFormState = {
    email: "",
    password: "",
    passwordConfirmation: ""
};

export default (
    state = initialState,
    action: RegisterFormActions
): IRegisterFormState => {
    switch (action.type) {
        case REGISTER_F0RM_CHANGE_PASSWORD:
            return {
                ...state,
                password: action.password
            };
        case REGISTER_FORM_CHANGE_EMAIL:
            return {
                ...state,
                email: action.email
            };
        case REGISTER_FORM_CHANGE_PASSWORD_CONFIRMATION:
            return {
                ...state,
                passwordConfirmation: action.passwordConfirmation
            };
        case REGISTER_FORM_SUBMITED:
            return {
                ...state,
                userId: action.userId
            };
        default:
            return state;
    }
};
