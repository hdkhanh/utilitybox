package com.tech.auth.services;

import com.tech.auth.models.entities.RefreshTokenEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

public interface RefreshTokenService {
    Optional<RefreshTokenEntity> findByToken(final String token);
    RefreshTokenEntity generateRefreshToken(final String username);
    RefreshTokenEntity verifyExpiration(final RefreshTokenEntity token);
    int deleteByUsername(final String username);
}
