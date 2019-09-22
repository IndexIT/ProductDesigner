import { combineReducers } from "redux";

import authController from "./store/AuthController/reducers";
import designerPage from "./store/DesignerPage/reducers";
import homePage from "./store/HomePage/reducers";
import layout from "./store/Layout/reducers";
import loginForm from "./store/LoginForm/reducers";
import registerForm from "./store/RegisterForm/reducers";
import snackController from "./store/SnackController/reducers";

const rootReducer = combineReducers({
    authController,
    designerPage,
    homePage,
    layout,
    loginForm,
    registerForm,
    snackController,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;