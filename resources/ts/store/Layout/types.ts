import { IResponse } from "../../mainTypes";

export const LAYOUT_CATEGORIES_LOADED = "LAYOUT_CATEGORIES_LOADED";

export const LAYOUT_MOBILE_SIDEBAR_TOGGLE = "LAYOUT_MOBILE_SIDEBAR_TOGGLE";

export interface IHeaderSubCategory {
    title: string;
    id: number;
}

export interface IHeaderCategory {
    id:number;
    title: string;
    subCategories: IHeaderSubCategory[];
}

export interface ILayoutState {
    mobileSidebarOpen: boolean;
    categories: IHeaderCategory[];
}

export interface IToggleMobileSidebarAction {
    type: typeof LAYOUT_MOBILE_SIDEBAR_TOGGLE;
}

export interface ILoadedCategories {
    type: typeof LAYOUT_CATEGORIES_LOADED;
    categories: IHeaderCategory[];
}

export interface ICategoriesResponse extends IResponse {
    categories?: IHeaderCategory[];
}

export type LayoutActions = IToggleMobileSidebarAction | ILoadedCategories;
