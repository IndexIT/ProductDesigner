import {
    APP_CLOSE_SNACK,
    APP_CONFIRM_SNACK,
    APP_ERROR_SNACK,
    APP_INFO_SNACK,
    APP_SUCCESS_SNACK,
    APP_WARNING_SNACK,
    ICloseSnackAction,
    IConfirmSnackAction,
    IErrorSnackAction,
    IInfoSnackAction,
    ISnack,
    ISuccessSnackAction,
    IWarningSnackAction
} from "./types";

export const errorSnack = (
    message: string,
    timeout = undefined
): IErrorSnackAction => ({
    message,
    timeout,
    type: APP_ERROR_SNACK
});

export const successSnack = (
    message: string,
    timeout = undefined
): ISuccessSnackAction => ({
    message,
    timeout,
    type: APP_SUCCESS_SNACK
});

export const warningSnack = (
    message: string,
    timeout = undefined
): IWarningSnackAction => ({
    message,
    timeout,
    type: APP_WARNING_SNACK
});

export const infoSnack = (
    message: string,
    timeout = undefined
): IInfoSnackAction => ({
    message,
    timeout,
    type: APP_INFO_SNACK
});

export const confirmSnack = (
    message: string,
    onCancel: () => void,
    onConfirm: () => void,
    timeout = undefined
): IConfirmSnackAction => ({
    message,
    onCancel,
    onConfirm,
    timeout,
    type: APP_CONFIRM_SNACK
});

export const closeSnack = (snack: ISnack): ICloseSnackAction => ({
    snack,
    type: APP_CLOSE_SNACK
});
