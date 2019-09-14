// Snack types
export const APP_WARNING_SNACK = "APP_WARNING_SNACK";
export const APP_SUCCESS_SNACK = "APP_SUCCESS_SNACK";
export const APP_ERROR_SNACK = "APP_ERROR_SNACK";
export const APP_CONFIRM_SNACK = "APP_CONFIRM_SNACK";
export const APP_INFO_SNACK = "APP_INFO_SNACK";
export const APP_CLOSE_SNACK = "APP_CLOSE_SNACK";

export interface ISnack {
    index: number;
    message: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    open: boolean;
    time: number;
    timeout?: number;
    type: "error" | "success" | "info" | "confirm" | "warning";
}

export interface IBaseSnackAction {
    message: string;
    timeout?: number;
}

export interface IInfoSnackAction extends IBaseSnackAction {
    type: typeof APP_INFO_SNACK;
}

export interface IErrorSnackAction extends IBaseSnackAction {
    type: typeof APP_ERROR_SNACK;
}

export interface ISuccessSnackAction extends IBaseSnackAction {
    type: typeof APP_SUCCESS_SNACK;
}

export interface IWarningSnackAction extends IBaseSnackAction {
    type: typeof APP_WARNING_SNACK;
}

export interface IConfirmSnackAction extends IBaseSnackAction {
    onCancel: () => void;
    onConfirm: () => void;
    type: typeof APP_CONFIRM_SNACK;
}

export interface ICloseSnackAction {
    snack: ISnack;
    type: typeof APP_CLOSE_SNACK;
}

export interface ISnackState {
    nextSnackIndex: number;
    snacks: ISnack[];
}

export type SnackActionTypes =
    | IInfoSnackAction
    | IErrorSnackAction
    | ISuccessSnackAction
    | IWarningSnackAction
    | IConfirmSnackAction
    | ICloseSnackAction;
