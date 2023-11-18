package com.utilitybox.gateway.configs;

import com.utilitybox.share.utilities.AuthenticationUtility;
import com.utilitybox.share.utilities.JWTUtility;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {
    @Value("${jwt.secret}")
    private String jwtSecretKey;

    @Value("${jwt.expiration}")
    private int jwtAccessTokenExpiration;

    @Bean
    public JWTUtility jwtUtility() {
        return new JWTUtility(jwtSecretKey, jwtAccessTokenExpiration);
    }

    @Bean
    public AuthenticationUtility authenticationUtility() {
        return new AuthenticationUtility();
    }
}
