import { combineReducers } from "redux";

import authController from "./store/AuthController/reducers";
import homePage from "./store/HomePage/reducers";
import layout from "./store/Layout/reducers";

const rootReducer = combineReducers({
    authController,
    homePage,
    layout,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;