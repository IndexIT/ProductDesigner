import { combineReducers } from "redux";

import authController from "./store/AuthController/reducers";
import homePage from "./store/HomePage/reducers";
import layout from "./store/Layout/reducers";
import loginForm from "./store/LoginForm/reducers";
import registerForm from "./store/RegisterForm/reducers";

const rootReducer = combineReducers({
    authController,
    homePage,
    layout,
    loginForm,
    registerForm,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;