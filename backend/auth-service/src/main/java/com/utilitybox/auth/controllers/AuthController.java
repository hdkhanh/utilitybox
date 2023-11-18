package com.utilitybox.auth.controllers;

import com.utilitybox.auth.configs.JWTCookieService;
import com.utilitybox.auth.models.dtos.GetProfileResponse;
import com.utilitybox.auth.models.dtos.LoginRequest;
import com.utilitybox.auth.models.dtos.LoginResponse;
import com.utilitybox.auth.models.dtos.TokenRefreshResponse;
import com.utilitybox.auth.models.entities.RefreshTokenEntity;
import com.utilitybox.auth.models.entities.UserEntity;
import com.utilitybox.auth.models.exceptions.InvalidCredentialsException;
import com.utilitybox.auth.models.exceptions.TokenRefreshException;
import com.utilitybox.auth.services.RefreshTokenService;
import com.utilitybox.auth.services.UserService;
import com.utilitybox.share.constants.ApiConstants;
import com.utilitybox.share.utilities.AuthenticationUtility;
import com.utilitybox.share.utilities.JWTUtility;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final RefreshTokenService refreshTokenService;
    private final JWTUtility jwtUtility;
    private final JWTCookieService jwtCookieService;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final AuthenticationUtility authenticationUtility;


    @GetMapping(ApiConstants.API_AUTH_PROFILE)
    @Operation(summary = "Get user profile")
    public ResponseEntity<GetProfileResponse> profile(HttpServletRequest request) {
        final String username = authenticationUtility.getUsername(request);
        final UserEntity userEntity = userService.findUserByUsername(username);

        return ResponseEntity.ok(GetProfileResponse.builder()
                .username(userEntity.getUsername())
                .email(userEntity.getEmail())
                .build());
    }

    @PostMapping(ApiConstants.API_AUTH_LOGIN)
    @Operation(summary = "Authenticate user and get accessToken and refreshToken")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) throws Exception {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception e) {
            throw new InvalidCredentialsException(e);
        }

        final UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        final String accessToken = jwtUtility.generateToken(userDetails.getUsername());

        final RefreshTokenEntity refreshToken = refreshTokenService.generateRefreshToken(userDetails.getUsername());
        final ResponseCookie refreshTokenCookie = jwtCookieService.generateRefreshTokenCookie(refreshToken.getToken());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .body(new LoginResponse(accessToken));
    }

    @PostMapping(ApiConstants.API_AUTH_LOGOUT)
    @Operation(summary = "Logout current user")
    public ResponseEntity<Void> logout(final HttpServletRequest request, final HttpServletResponse response) {
        final String authHeader = request.getHeader(AuthenticationUtility.AUTHORIZATION_HEADER);
        final String accessToken = authenticationUtility.getAuthAccessToken(authHeader);
        final String username = accessToken != null ? jwtUtility.extractUsername(accessToken) : null;
        if (username != null) {
            refreshTokenService.deleteByUsername(username);
            final ResponseCookie refreshTokenCookie = jwtCookieService.getCleanRefreshTokenCookie();
            response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.badRequest().build();
    }

    @PostMapping(ApiConstants.API_AUTH_REFRESH_TOKEN)
    @Operation(summary = "Refresh expired accessToken using refreshToken")
    public ResponseEntity<TokenRefreshResponse> refreshToken(HttpServletRequest request) {
        final String refreshToken = jwtCookieService.getRefreshTokenFromCookies(request);
        if (StringUtils.isEmpty(refreshToken)) {
            return ResponseEntity.badRequest().build();
        }

        return refreshTokenService.findByToken(refreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshTokenEntity::getUserId)
                .map(userService::findUserById)
                .map(user -> {
                    final String accessToken = jwtUtility.generateToken(user.getUsername());
                    return ResponseEntity.ok(new TokenRefreshResponse(accessToken));
                })
                .orElseThrow(() -> new TokenRefreshException(refreshToken, "Refresh token is not in database!"));
    }
}


