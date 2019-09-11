import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { APP_URL } from "./config";
import { IResponse } from "./mainTypes";
import { ILoginResponse, IUserResponse } from "./store/AuthController/types";

const request = (
    url: string,
    parameters?: { [x in string]: any },
    config: undefined | AxiosRequestConfig = undefined
) =>
    axios
        .post(APP_URL + "api/web/" + url, parameters, config)
        .then(
            (response: AxiosResponse): IResponse => ({
                success: true,
                ...response.data
            })
        )
        .catch(
            (err: AxiosError): IResponse => ({
                message:
                    typeof err.response !== "undefined"
                        ? err.response.data.message
                        : "",
                success: false
            })
        );

const authController = {
    login: (email: string, password: string): Promise<ILoginResponse> =>
        request("user/login", { email, password }),
    userInfo: (): Promise<IUserResponse> => request("user/info")
};

export default {
    authController
};
