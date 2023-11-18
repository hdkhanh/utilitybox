package com.utilitybox.gateway.configs;

import com.utilitybox.share.constants.ApiConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

@Configuration
@RequiredArgsConstructor
public class GatewayConfiguration {
    private final JWTAuthenticationFilter jwtAuthenticationFilter;

    @Value("${application.uis.home}")
    private String homeUIUri;

    @Value("${application.services.auth}")
    private String authServiceUri;

    @Value("${application.services.app}")
    private String appServiceUri;

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(r -> r.path(ApiConstants.API_AUTH_PATTERN)
                        .filters(f -> f.filter(jwtAuthenticationFilter))
                        .uri(authServiceUri))
                .route(r -> r.path(ApiConstants.AUTH_OPEN_API_URL).and().method(HttpMethod.GET).uri(authServiceUri))
                .route(r -> r.path(ApiConstants.API_APPLICATION_PATTERN)
                        .filters(f -> f.filter(jwtAuthenticationFilter))
                        .uri(appServiceUri))
                .route(r -> r.path(ApiConstants.APP_OPEN_API_URL).and().method(HttpMethod.GET).uri(appServiceUri))
                .route(r -> r.path("/**").uri(homeUIUri))
                .build();
    }
}
