export const DESIGNER_PAGE_TOGGLE_IMAGE_MODEL =
    "DESIGNER_PAGE_TOGGLE_IMAGE_MODEL";
export const DESIGNER_PAGE_TOGGLE_TEXT_MODEL =
    "DESIGNER_PAGE_TOGGLE_TEXT_MODEL";
export const DESIGNER_PAGE_CHANGE_CURRENT_COLOR =
    "DESIGNER_PAGE_CHANGE_CURRENT_COLOR";
export const DESIGNER_PAGE_CHANGE_SIZE = "DESIGNER_PAGE_CHANGE_SIZE";
export const DESIGNER_PAGE_CHANGE_COLOR = "DESIGNER_PAGE_CHANGE_COLOR";
export const DESIGNER_PAGE_CHANGE_POSITION = "DESIGNER_PAGE_CHANGE_POSITION";
export const DESIGNER_PAGE_ROTATE = "DESIGNER_PAGE_ROTATE";
export const DESIGNER_PAGE_ADD_ITEM = "DESIGNER_PAGE_ADD_ITEM";
export const DESIGNER_PAGE_REMOVE_ITEM = "DESIGNER_PAGE_REMOVE_ITEM";

export interface IDesignItem {
    itemId: number;
    width: number;
    height: number;
    originalHeight: number;
    originalWidth: number;
    rotate: number;
    flipHorizontal: boolean;
    flipVertical: boolean;
    color: string;
    left: number;
    top: number;
}

export interface IDesignImage extends IDesignItem {
    src: string;
}

export interface IDesignFont extends IDesignItem {
    fontId: number;
    fontName: number;
    fontSize: number;
    text: string;
}

export type DesignerItemType = IDesignItem | IDesignImage | IDesignFont;

export interface IDesignerState {
    color: string;
    items: {
        [x: string]: DesignerItemType;
    };
    imageModelOpen: boolean;
    textModelOpen: boolean;
}

export interface IChangeSize {
    type: typeof DESIGNER_PAGE_CHANGE_SIZE;
    width: number;
    height: number;
    itemId: number;
}

export interface IChangeColor {
    type: typeof DESIGNER_PAGE_CHANGE_COLOR;
    color: string;
    itemId: number;
}

export interface IRotate {
    type: typeof DESIGNER_PAGE_ROTATE;
    rotate: number;
    itemId: number;
}

export interface IAddItem {
    type: typeof DESIGNER_PAGE_ADD_ITEM;
    item: DesignerItemType;
}

export interface IRemoveItem {
    type: typeof DESIGNER_PAGE_REMOVE_ITEM;
    itemId: number;
}

export interface IChangeCurrentColor {
    type: typeof DESIGNER_PAGE_CHANGE_CURRENT_COLOR;
    color: string;
}

export interface IToggleImageModel {
    type: typeof DESIGNER_PAGE_TOGGLE_IMAGE_MODEL;
    open: boolean;
}

export interface IToggleFontModel {
    type: typeof DESIGNER_PAGE_TOGGLE_TEXT_MODEL;
    open: boolean;
}

export interface IChangePosition {
    type: typeof DESIGNER_PAGE_CHANGE_POSITION;
    left: number;
    top: number;
    itemId: number;
}

export type DesignerPageActions =
    | IChangeSize
    | IChangeColor
    | IRotate
    | IAddItem
    | IRemoveItem
    | IChangeCurrentColor
    | IToggleImageModel
    | IToggleFontModel
    | IChangePosition;
