package com.tech.auth.controllers;

import com.tech.auth.constants.ApiConstants;
import com.tech.auth.models.dtos.GetProfileResponse;
import com.tech.auth.models.dtos.LoginResponse;
import com.tech.auth.models.dtos.TokenRefreshResponse;
import com.tech.auth.models.entities.RefreshTokenEntity;
import com.tech.auth.models.entities.UserEntity;
import com.tech.auth.models.exceptions.InvalidCredentialsException;
import com.tech.auth.models.exceptions.TokenRefreshException;
import com.tech.auth.models.dtos.LoginRequest;
import com.tech.auth.configs.JWTService;
import com.tech.auth.services.RefreshTokenService;
import com.tech.auth.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final RefreshTokenService refreshTokenService;
    private final JWTService jwtService;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;


    @GetMapping(ApiConstants.API_AUTH_PROFILE)
    @Operation(summary = "Get user profile")
    public ResponseEntity<GetProfileResponse> profile() {
        final UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        final UserEntity userEntity = userService.findUserByUsername(userDetails.getUsername());

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
        final String accessToken = jwtService.generateToken(userDetails.getUsername());

        final RefreshTokenEntity refreshToken = refreshTokenService.generateRefreshToken(userDetails.getUsername());
        final ResponseCookie refreshTokenCookie = jwtService.generateRefreshTokenCookie(refreshToken.getToken());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .body(new LoginResponse(accessToken));
    }

    @PostMapping(ApiConstants.API_AUTH_REFRESH_TOKEN)
    @Operation(summary = "Refresh expired accessToken using refreshToken")
    public ResponseEntity<TokenRefreshResponse> refreshToken(HttpServletRequest request) {
        final String refreshToken = jwtService.getRefreshTokenFromCookies(request);
        if (StringUtils.isEmpty(refreshToken)) {
            return ResponseEntity.badRequest().build();
        }

        return refreshTokenService.findByToken(refreshToken)
            .map(refreshTokenService::verifyExpiration)
            .map(RefreshTokenEntity::getUserId)
            .map(userService::findUserById)
            .map(user -> {
                final String accessToken = jwtService.generateToken(user.getUsername());
                return ResponseEntity.ok(new TokenRefreshResponse(accessToken));
            })
            .orElseThrow(() -> new TokenRefreshException(refreshToken, "Refresh token is not in database!"));
    }
}


