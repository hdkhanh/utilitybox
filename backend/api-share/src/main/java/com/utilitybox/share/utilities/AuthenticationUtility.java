package com.utilitybox.share.utilities;

import jakarta.servlet.http.HttpServletRequest;

public class AuthenticationUtility {
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String USERNAME_HEADER = "x-username";

    public String getAuthAccessToken(final String authHeader) {
        final boolean haveAuthHeader = authHeader != null && authHeader.startsWith("Bearer ");
        return haveAuthHeader ? authHeader.substring(7) : null;
    }

    public String getUsername(final HttpServletRequest request) {
        return request.getHeader(AuthenticationUtility.USERNAME_HEADER);
    }
}
