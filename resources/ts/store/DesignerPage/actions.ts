import {
    DESIGNER_PAGE_ADD_ITEM,
    DESIGNER_PAGE_CHANGE_COLOR,
    DESIGNER_PAGE_CHANGE_CURRENT_COLOR,
    DESIGNER_PAGE_CHANGE_POSITION,
    DESIGNER_PAGE_CHANGE_SIZE,
    DESIGNER_PAGE_REMOVE_ITEM,
    DESIGNER_PAGE_ROTATE,
    DESIGNER_PAGE_TOGGLE_TEXT_MODEL,
    DesignerItemType,
    IAddItem,
    IChangeColor,
    IChangeCurrentColor,
    IChangePosition,
    IChangeSize,
    IRemoveItem,
    IRotate,
    IToggleFontModel
} from "./types";

export const toggleFontModel = (open: boolean): IToggleFontModel => ({
    open,
    type: DESIGNER_PAGE_TOGGLE_TEXT_MODEL
});

export const changeCurrentColor = (color: string): IChangeCurrentColor => ({
    color,
    type: DESIGNER_PAGE_CHANGE_CURRENT_COLOR
});

export const changeColor = (itemId: number, color: string): IChangeColor => ({
    color,
    itemId,
    type: DESIGNER_PAGE_CHANGE_COLOR
});

export const changeSize = (
    itemId: number,
    width: number,
    height: number
): IChangeSize => ({
    height,
    itemId,
    type: DESIGNER_PAGE_CHANGE_SIZE,
    width
});

export const changeRotate = (itemId: number, rotate: number): IRotate => ({
    itemId,
    rotate,
    type: DESIGNER_PAGE_ROTATE
});

export const changePosition = (
    itemId: number,
    left: number,
    top: number
): IChangePosition => ({
    itemId,
    left,
    top,
    type: DESIGNER_PAGE_CHANGE_POSITION
});

export const addItem = (item: DesignerItemType): IAddItem => ({
    item,
    type: DESIGNER_PAGE_ADD_ITEM
});

export const removeItem = (itemId: number): IRemoveItem => ({
    itemId,
    type: DESIGNER_PAGE_REMOVE_ITEM
});
