package com.utilitybox.gateway.configs;

import com.utilitybox.share.constants.ApiConstants;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.function.Predicate;

@Component
public class RouterValidator {
    public Predicate<ServerHttpRequest> isSecured =
            request -> Arrays.stream(ApiConstants.API_WHITELIST).noneMatch(uri -> request.getURI().getPath().contains(uri));
}
