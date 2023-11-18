package com.utilitybox.share.constants;

public class ApiConstants {
    public static final String API_CONTEXT = "/api";
    public static final String API_VERSION = "/v1";
    public static final String API_BASE_PATH = API_CONTEXT + API_VERSION;

    public static final String API_AUTH_BASE_PATH = API_BASE_PATH + "/auth";
    public static final String API_AUTH_PATTERN = API_AUTH_BASE_PATH + "/**";
    public static final String API_AUTH_PROFILE = API_AUTH_BASE_PATH + "/profile";
    public static final String API_AUTH_LOGIN = API_AUTH_BASE_PATH + "/login";
    public static final String API_AUTH_REFRESH_TOKEN = API_AUTH_BASE_PATH + "/refresh-token";
    public static final String API_AUTH_LOGOUT = API_AUTH_BASE_PATH + "/logout";
    public static final String AUTH_OPEN_API_URL = "/auth-service/v3/api-docs";

    public static final String API_APPLICATION_BASE_PATH = API_BASE_PATH + "/app";
    public static final String API_APPLICATION_PATTERN = API_APPLICATION_BASE_PATH + "/**";
    public static final String API_APPLICATION_GET_ALL = API_APPLICATION_BASE_PATH + "/all";
    public static final String APP_OPEN_API_URL = "/app-service/v3/api-docs";

    public static final String[] API_WHITELIST = {
            API_AUTH_LOGIN,
            API_AUTH_REFRESH_TOKEN,
    };
}
