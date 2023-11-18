package com.utilitybox.auth.services;

import com.utilitybox.auth.models.entities.RefreshTokenEntity;

import java.util.Optional;

public interface RefreshTokenService {
    Optional<RefreshTokenEntity> findByToken(final String token);

    RefreshTokenEntity generateRefreshToken(final String username);

    RefreshTokenEntity verifyExpiration(final RefreshTokenEntity token);

    int deleteByUsername(final String username);
}
