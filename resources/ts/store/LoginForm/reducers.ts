import {
    ILoginFormState,
    LOGIN_FORM_CLEAR_FORM,
    LOGIN_FORM_EMAIL_CHANGE,
    LOGIN_FORM_PASSWORD_CHANGE,
    LoginFormActions,
} from "./types";

const initialState: ILoginFormState = {
    email: "",
    password: ""
};

export default (state = initialState, action: LoginFormActions) => {
    switch (action.type) {
        case LOGIN_FORM_EMAIL_CHANGE:
            return {
                ...state,
                email: action.email
            };
        case LOGIN_FORM_PASSWORD_CHANGE:
            return {
                ...state,
                password: action.password
            };
        case LOGIN_FORM_CLEAR_FORM:
            return {
                ...state,
                email:"",
                password:""
            };
        default:
            return state;
    }
};
