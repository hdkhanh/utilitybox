package com.utilitybox.gateway.configs;

import com.utilitybox.share.utilities.AuthenticationUtility;
import com.utilitybox.share.utilities.JWTUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@RefreshScope
@Component
@RequiredArgsConstructor
public class JWTAuthenticationFilter implements GatewayFilter {
    private final JWTUtility jwtUtility;
    private final AuthenticationUtility authenticationUtility;
    private final RouterValidator routerValidator;

    @Override
    public Mono<Void> filter(final ServerWebExchange exchange, final GatewayFilterChain chain) {
        final ServerHttpRequest request = exchange.getRequest();
        if (!routerValidator.isSecured.test(request)) {
            return chain.filter(exchange);
        }

        if (this.isAuthMissing(request)) {
            return this.onError(exchange);
        }

        final String authHeader = request.getHeaders().getOrEmpty(AuthenticationUtility.AUTHORIZATION_HEADER).get(0);
        final String token = authenticationUtility.getAuthAccessToken(authHeader);
        if (jwtUtility.isTokenExpired(token)) {
            return this.onError(exchange);
        }

        this.populateRequestWithHeaders(exchange, token);
        return chain.filter(exchange);
    }

    private Mono<Void> onError(final ServerWebExchange exchange) {
        final ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        return response.setComplete();
    }

    private boolean isAuthMissing(ServerHttpRequest request) {
        return !request.getHeaders().containsKey(AuthenticationUtility.AUTHORIZATION_HEADER);
    }

    private void populateRequestWithHeaders(final ServerWebExchange exchange, final String token) {
        final String username = jwtUtility.extractUsername(token);
        exchange.getRequest().mutate()
                .header(AuthenticationUtility.USERNAME_HEADER, String.valueOf(username))
                .build();
    }
}
