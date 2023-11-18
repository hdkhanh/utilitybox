/* eslint-disable */
/**
 * auth-service doc
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.utilitybox).
 * https://openapi-generator.utilitybox
 * Do not edit the class manually.
 */

import { Configuration } from "./configuration";
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from "axios";
// Some imports not used depending on template conditions, we also need prettier-ignore so that the import does not get split and ts-ignore still works
// prettier-ignore
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// Some imports not used depending on template conditions, we also need prettier-ignore so that the import does not get split and ts-ignore still works
// prettier-ignore
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 *
 * @export
 * @interface GetProfileResponse
 */
export interface GetProfileResponse {
    /**
     *
     * @type {string}
     * @memberof GetProfileResponse
     */
    username?: string;
    /**
     *
     * @type {string}
     * @memberof GetProfileResponse
     */
    email?: string;
}
/**
 *
 * @export
 * @interface LoginRequest
 */
export interface LoginRequest {
    /**
     *
     * @type {string}
     * @memberof LoginRequest
     */
    username?: string;
    /**
     *
     * @type {string}
     * @memberof LoginRequest
     */
    password?: string;
}
/**
 *
 * @export
 * @interface LoginResponse
 */
export interface LoginResponse {
    /**
     *
     * @type {string}
     * @memberof LoginResponse
     */
    accessToken?: string;
}
/**
 *
 * @export
 * @interface TokenRefreshResponse
 */
export interface TokenRefreshResponse {
    /**
     *
     * @type {string}
     * @memberof TokenRefreshResponse
     */
    accessToken?: string;
}

/**
 * AuthControllerApi - axios parameter creator
 * @export
 */
export const AuthControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @summary Authenticate user and get accessToken and refreshToken
         * @param {LoginRequest} loginRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login: async (loginRequest: LoginRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'loginRequest' is not null or undefined
            assertParamExists("login", "loginRequest", loginRequest);
            const localVarPath = `/api/v1/auth/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration);

            localVarHeaderParameter["Content-Type"] = "application/json";

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
            };
            const needsSerialization =
                typeof loginRequest !== "string" ||
                localVarRequestOptions.headers["Content-Type"] === "application/json";
            localVarRequestOptions.data = needsSerialization
                ? JSON.stringify(loginRequest !== undefined ? loginRequest : {})
                : loginRequest || "";

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @summary Logout current user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logout: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/auth/logout`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration);

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
            };

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @summary Get user profile
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        profile: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/auth/profile`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration);

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
            };

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @summary Refresh expired accessToken using refreshToken
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        refreshToken: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/auth/refresh-token`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration);

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
            };

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};

/**
 * AuthControllerApi - functional programming interface
 * @export
 */
export const AuthControllerApiFp = function (configuration?: Configuration) {
    const localVarAxiosParamCreator = AuthControllerApiAxiosParamCreator(configuration);
    return {
        /**
         *
         * @summary Authenticate user and get accessToken and refreshToken
         * @param {LoginRequest} loginRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async login(
            loginRequest: LoginRequest,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoginResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.login(loginRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         *
         * @summary Logout current user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async logout(
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.logout(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         *
         * @summary Get user profile
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async profile(
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetProfileResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.profile(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         *
         * @summary Refresh expired accessToken using refreshToken
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async refreshToken(
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TokenRefreshResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.refreshToken(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    };
};

/**
 * AuthControllerApi - factory interface
 * @export
 */
export const AuthControllerApiFactory = function (
    configuration?: Configuration,
    basePath?: string,
    axios?: AxiosInstance,
) {
    const localVarFp = AuthControllerApiFp(configuration);
    return {
        /**
         *
         * @summary Authenticate user and get accessToken and refreshToken
         * @param {AuthControllerApiLoginRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login(
            requestParameters: AuthControllerApiLoginRequest,
            options?: AxiosRequestConfig,
        ): AxiosPromise<LoginResponse> {
            return localVarFp
                .login(requestParameters.loginRequest, options)
                .then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Logout current user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logout(options?: AxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.logout(options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Get user profile
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        profile(options?: AxiosRequestConfig): AxiosPromise<GetProfileResponse> {
            return localVarFp.profile(options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Refresh expired accessToken using refreshToken
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        refreshToken(options?: AxiosRequestConfig): AxiosPromise<TokenRefreshResponse> {
            return localVarFp.refreshToken(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AuthControllerApi - interface
 * @export
 * @interface AuthControllerApi
 */
export interface AuthControllerApiInterface {
    /**
     *
     * @summary Authenticate user and get accessToken and refreshToken
     * @param {AuthControllerApiLoginRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthControllerApiInterface
     */
    login(
        requestParameters: AuthControllerApiLoginRequest,
        options?: AxiosRequestConfig,
    ): AxiosPromise<LoginResponse>;

    /**
     *
     * @summary Logout current user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthControllerApiInterface
     */
    logout(options?: AxiosRequestConfig): AxiosPromise<void>;

    /**
     *
     * @summary Get user profile
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthControllerApiInterface
     */
    profile(options?: AxiosRequestConfig): AxiosPromise<GetProfileResponse>;

    /**
     *
     * @summary Refresh expired accessToken using refreshToken
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthControllerApiInterface
     */
    refreshToken(options?: AxiosRequestConfig): AxiosPromise<TokenRefreshResponse>;
}

/**
 * Request parameters for login operation in AuthControllerApi.
 * @export
 * @interface AuthControllerApiLoginRequest
 */
export interface AuthControllerApiLoginRequest {
    /**
     *
     * @type {LoginRequest}
     * @memberof AuthControllerApiLogin
     */
    readonly loginRequest: LoginRequest;
}

/**
 * AuthControllerApi - object-oriented interface
 * @export
 * @class AuthControllerApi
 * @extends {BaseAPI}
 */
export class AuthControllerApi extends BaseAPI implements AuthControllerApiInterface {
    /**
     *
     * @summary Authenticate user and get accessToken and refreshToken
     * @param {AuthControllerApiLoginRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthControllerApi
     */
    public login(requestParameters: AuthControllerApiLoginRequest, options?: AxiosRequestConfig) {
        return AuthControllerApiFp(this.configuration)
            .login(requestParameters.loginRequest, options)
            .then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @summary Logout current user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthControllerApi
     */
    public logout(options?: AxiosRequestConfig) {
        return AuthControllerApiFp(this.configuration)
            .logout(options)
            .then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @summary Get user profile
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthControllerApi
     */
    public profile(options?: AxiosRequestConfig) {
        return AuthControllerApiFp(this.configuration)
            .profile(options)
            .then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @summary Refresh expired accessToken using refreshToken
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthControllerApi
     */
    public refreshToken(options?: AxiosRequestConfig) {
        return AuthControllerApiFp(this.configuration)
            .refreshToken(options)
            .then((request) => request(this.axios, this.basePath));
    }
}
