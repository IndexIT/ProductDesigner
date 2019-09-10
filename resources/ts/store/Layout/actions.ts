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
