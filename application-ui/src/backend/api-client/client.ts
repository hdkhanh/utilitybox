import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { authFactory } from "./auth";
import { setAxiosAuthorizationToken, useAxiosInterceptor } from "./axios";
import { AuthControllerApiInterface } from "./openapi/generated/auth-service";

export type SetAccessTokenType = (accessToken: string) => void;

export interface IClientFactory {
    axios: AxiosInstance;
    auth: ReturnType<typeof authFactory>;
    setAccessToken: SetAccessTokenType;
}

export const clientFactory = (axios: AxiosInstance): IClientFactory => {
    const auth = authFactory(axios);
    useAxiosInterceptor(axios, setupRefreshTokenInterceptor(axios, auth));

    return {
        axios,
        auth,
        setAccessToken: (accessToken: string): void => {
            setAxiosAuthorizationToken(axios, accessToken);
        },
    };
};

const setupRefreshTokenInterceptor = (axios: AxiosInstance, auth: AuthControllerApiInterface) => {
    const onFullFilled = (response: AxiosResponse) => response;
    const onRejected = async (error: AxiosError) => {
        const config = error?.config as any;
        if (error?.response?.status === 401 && !config._retry) {
            config._retry = true;
            try {
                const result = await auth.refreshToken();
                const { accessToken } = result.data;
                setAxiosAuthorizationToken(axios, accessToken);

                return Promise.resolve(axios(config));
            } catch (_retryError: any) {
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    };

    return {
        onFullFilled,
        onRejected,
    };
};
