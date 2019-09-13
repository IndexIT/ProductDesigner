import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { APP_URL } from "./config";
import { IResponse } from "./mainTypes";
import { ILoginResponse, IUserResponse } from "./store/AuthController/types";
import { IHomeCategoriesResponse } from "./store/HomePage/types";
import { ICategoriesResponse } from "./store/Layout/types";

const request = (
    url: string,
    parameters?: { [x in string]: any },
    config: undefined | AxiosRequestConfig = undefined
) =>
    axios
        .post(APP_URL + "test/api/web/" + url, parameters, config)
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

const layout = {
    categories: (): Promise<ICategoriesResponse> => request("categories/header")
};

const homePage = {
    categories: (): Promise<IHomeCategoriesResponse> =>
        request("categories/home")
};

export default {
    authController,
    homePage,
    layout,
};
