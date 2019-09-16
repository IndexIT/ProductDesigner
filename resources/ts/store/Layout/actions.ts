import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import agent from "../../agent";
import {
    IHeaderCategory,
    ILoadedCategories,
    IToggleMobileSidebarAction,
    LAYOUT_CATEGORIES_LOADED,
    LAYOUT_MOBILE_SIDEBAR_TOGGLE
} from "./types";

export const loadedCategories = (
    categories: IHeaderCategory[]
): ILoadedCategories => ({
    categories,
    type: LAYOUT_CATEGORIES_LOADED
});

export const toggleSidebar = (): IToggleMobileSidebarAction => ({
    type: LAYOUT_MOBILE_SIDEBAR_TOGGLE
});

export const fetchCategories = (): ThunkAction<
    Promise<void>,
    {},
    {},
    AnyAction
> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    agent.layout.categories().then(({success,message,categories})=>{
        if(success&&categories){
            dispatch(loadedCategories(categories));
        } else if (message){
            console.error(message);
        }
    });
};
