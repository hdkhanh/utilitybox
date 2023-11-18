package com.tech.auth.configs;

import com.tech.auth.services.RefreshTokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {
    private final RefreshTokenService refreshTokenService;
    private final JWTService jwtService;
    private final AuthenticationService authenticationService;

    @Override
    public void logout(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final Authentication authentication
    ) {
        final String accessToken = authenticationService.getAuthAccessToken(request);
        final String username = accessToken != null ? jwtService.extractUsername(accessToken) : null;
        if (username != null) {
            refreshTokenService.deleteByUsername(username);

            final ResponseCookie refreshTokenCookie = jwtService.getCleanRefreshTokenCookie();
            response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());
        }
    }
}
