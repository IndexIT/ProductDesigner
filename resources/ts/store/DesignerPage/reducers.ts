import {
    DESIGNER_PAGE_ADD_ITEM,
    DESIGNER_PAGE_CHANGE_COLOR,
    DESIGNER_PAGE_CHANGE_CURRENT_COLOR,
    DESIGNER_PAGE_CHANGE_POSITION,
    DESIGNER_PAGE_CHANGE_SIZE,
    DESIGNER_PAGE_REMOVE_ITEM,
    DESIGNER_PAGE_ROTATE,
    DESIGNER_PAGE_TOGGLE_TEXT_MODEL,
    DesignerPageActions,
    IDesignerState
} from "./types";

const initialState: IDesignerState = {
    color: "#ff0000",
    items: {},
    lastItemId: -1,
    textModelOpen: false,
};

export default (
    state = initialState,
    action: DesignerPageActions
): IDesignerState => {
    switch (action.type) {
        case DESIGNER_PAGE_TOGGLE_TEXT_MODEL:
            return {
                ...state,
                textModelOpen: action.open
            };
        case DESIGNER_PAGE_CHANGE_CURRENT_COLOR:
            return {
                ...state,
                color: action.color
            };
        case DESIGNER_PAGE_CHANGE_SIZE:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.itemId]: {
                        ...state.items[action.itemId],
                        height: action.height,
                        width: action.width
                    }
                }
            };
        case DESIGNER_PAGE_CHANGE_COLOR:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.itemId]: {
                        ...state.items[action.itemId],
                        color: action.color
                    }
                }
            };
        case DESIGNER_PAGE_ADD_ITEM:
            return {
                ...state,
                items: {
                    ...state.items,
                    [state.lastItemId+1]: {
                        ...action.item,
                        itemId: state.lastItemId+1
                    }
                },
                lastItemId: state.lastItemId+1
            };
        case DESIGNER_PAGE_ROTATE:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.itemId]: {
                        ...state.items[action.itemId],
                        rotate: action.rotate
                    }
                }
            };
        case DESIGNER_PAGE_REMOVE_ITEM:
            const modedItems = { ...state.items };

            delete modedItems[action.itemId];

            return {
                ...state,
                items: modedItems
            };
        case DESIGNER_PAGE_CHANGE_POSITION:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.itemId]:{
                        ...state.items[action.itemId],
                        left: action.left,
                        top: action.top
                    }
                }
            };
        default:
            return state;
    }
};
