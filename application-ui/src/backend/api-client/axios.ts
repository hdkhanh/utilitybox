import globalAxios, { AxiosInstance, AxiosResponse, CreateAxiosDefaults } from "axios";

/**
 * Default config from axios sets request headers:
 *
 * For all methods:
 *  Accept: application/json, text/html
 *
 * For POST and PUT of JS objects (isObject):
 *  Content-Type: application/json;charset=utf8
 *
 * Setting default Content-Type to application/json;charset=utf - will be sent regardless of data as the
 * backend can only accept JSON anyway.
 */
const _CONFIG: CreateAxiosDefaults = {
    maxContentLength: -1,
    withCredentials: true,
    headers: {
        post: {
            "Content-Type": "application/json;charset=utf8",
        },
        put: {
            "Content-Type": "application/json;charset=utf8",
        },
    },
};

/**
 * Returns an instance of axios with default configuration.
 */
export const axios: AxiosInstance = globalAxios.create(_CONFIG);

/**
 * Sets or clears Authorization token to use in the provided axios instance. If the token is provided,
 * then it will be used in `common` Authorization header which will be sent on all requests.
 *
 * If the token is undefined, the common Authorization header setting will be removed from axios config.
 *
 * @param axios - an instance of axios to update with authorization token
 * @param token - token to set or undefined to clear
 * @public
 */
export const setAxiosAuthorizationToken = (axios: AxiosInstance, token: string | undefined): void => {
    if (!token) {
        delete axios.defaults.headers.common["Authorization"];
    } else {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
};

export type OnAxiosFullFilledType =
    | ((value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>)
    | null
    | undefined;
export type OnAxiosRejectedType = ((error: any) => any) | null | undefined;
export interface IUseInterceptorOptions {
    onFulfilled?: OnAxiosFullFilledType;
    onRejected?: OnAxiosRejectedType;
}

export const useAxiosInterceptor = (axios: AxiosInstance, options: IUseInterceptorOptions) => {
    axios.interceptors.response.use(options?.onFulfilled, options?.onRejected);
};
