import {
    ILayoutState,
    LAYOUT_CATEGORIES_LOADED,
    LAYOUT_CHANGE_CATEGORY_MENU,
    LAYOUT_MOBILE_SIDEBAR_TOGGLE,
    LayoutActions,
} from "./types";

const initialState: ILayoutState = {
    activeCategoryMenu:-1,
    categories: [],
    mobileSidebarOpen: false
};

export default (state = initialState, action: LayoutActions): ILayoutState => {
    switch (action.type) {
        case LAYOUT_CATEGORIES_LOADED:
            return {
                ...state,
                categories: action.categories
            };
        case LAYOUT_MOBILE_SIDEBAR_TOGGLE:
            return {
                ...state,
                mobileSidebarOpen: !state.mobileSidebarOpen
            };
        case LAYOUT_CHANGE_CATEGORY_MENU:
            return {
                ...state,
                activeCategoryMenu: action.activeCategoryMenu
            };
        default:
            return state;
    }
};
