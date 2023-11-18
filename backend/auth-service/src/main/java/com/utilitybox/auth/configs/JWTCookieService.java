package com.utilitybox.auth.configs;

import com.utilitybox.share.constants.ApiConstants;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.web.util.WebUtils;

@Service
public class JWTCookieService {
    @Value("${jwt.refresh-cookie-name}")
    private String refreshTokenCookieName;

    public ResponseCookie generateRefreshTokenCookie(final String refreshToken) {
        return generateCookie(refreshTokenCookieName, refreshToken);
    }

    public String getRefreshTokenFromCookies(HttpServletRequest request) {
        return getCookieValueByName(request, refreshTokenCookieName);
    }

    public ResponseCookie getCleanRefreshTokenCookie() {
        return ResponseCookie
                .from(refreshTokenCookieName, null)
                .path(ApiConstants.API_AUTH_REFRESH_TOKEN)
                .build();
    }

    private ResponseCookie generateCookie(final String name, final String value) {
        return ResponseCookie.from(name, value).path(ApiConstants.API_AUTH_REFRESH_TOKEN).maxAge(24 * 60 * 60).httpOnly(true).build();
    }

    private String getCookieValueByName(HttpServletRequest request, String name) {
        final Cookie cookie = WebUtils.getCookie(request, name);
        if (cookie != null) {
            return cookie.getValue();
        } else {
            return null;
        }
    }
}