import {
    ILayoutState,
    LAYOUT_CATEGORIES_LOADED,
    LAYOUT_MOBILE_SIDEBAR_TOGGLE,
    LayoutActions
} from "./types";

const initialState: ILayoutState = {
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
        default:
            return state;
    }
};
