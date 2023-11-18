package com.tech.auth.configs;

import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    public String getAuthAccessToken(@NonNull final HttpServletRequest request) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final boolean haveAuthHeader = authHeader != null && authHeader.startsWith("Bearer ");
        return haveAuthHeader ? authHeader.substring(7) : null;
    }
}
