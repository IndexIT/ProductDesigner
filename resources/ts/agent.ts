import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { APP_URL } from "./config";
import { IResponse } from "./mainTypes";
import { ILoginResponse, IUserResponse } from "./store/AuthController/types";
import { IHomeCategoriesResponse, IAnimalResponse } from "./store/HomePage/types";
import { ICategoriesResponse } from "./store/Layout/types";
import { IRegisterResponse } from "./store/RegisterForm/types";

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
    emailConfirmation: (userId:number) :Promise<IResponse> =>
        request("user/emailConfirmation",{userId}),
    login: (email: string, password: string): Promise<ILoginResponse> =>
        request("user/login", { email, password }),
    register: (
        email: string,
        password: string,
        passwordConfirm: string
    ): Promise<IRegisterResponse> =>
        request("user/signup", { email, password, passwordConfirm }),
    userInfo: (): Promise<IUserResponse> => request("user/info"),
};

const layout = {
    categories: (): Promise<ICategoriesResponse> => request("categories/header")
};

const homePage = {
    animals:(keyword:string): Promise<IAnimalResponse>=>
        request("animals/search"),
    categories: (): Promise<IHomeCategoriesResponse> =>
        request("categories/home"),
};

export default {
    authController,
    homePage,
    layout
};
