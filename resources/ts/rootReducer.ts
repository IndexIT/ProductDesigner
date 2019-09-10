import { combineReducers } from "redux";

import authController from "./store/AuthController/reducers";
import layout from "./store/Layout/reducers";

const rootReducer = combineReducers({
    authController,
    layout,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;