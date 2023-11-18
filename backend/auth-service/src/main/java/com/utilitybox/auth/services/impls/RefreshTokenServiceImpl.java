package com.utilitybox.auth.services.impls;

import com.utilitybox.auth.models.entities.RefreshTokenEntity;
import com.utilitybox.auth.models.entities.UserEntity;
import com.utilitybox.auth.models.exceptions.TokenRefreshException;
import com.utilitybox.auth.models.repostiories.RefreshTokenRepository;
import com.utilitybox.auth.models.repostiories.UserRepository;
import com.utilitybox.auth.services.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {
    @Value("${jwt.refresh-expiration}")
    private int refreshTokenExpiration;

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    public Optional<RefreshTokenEntity> findByToken(final String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshTokenEntity generateRefreshToken(final String username) {
        final RefreshTokenEntity refreshToken = new RefreshTokenEntity();

        final Optional<UserEntity> userEntity = userRepository.findByUsername(username);
        if (userEntity.isPresent()) {
            refreshToken.setUserId(userEntity.get().getId());
            refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenExpiration));
            refreshToken.setToken(UUID.randomUUID().toString());

            return refreshTokenRepository.save(refreshToken);
        }

        throw new TokenRefreshException(null, "User not found");
    }

    public RefreshTokenEntity verifyExpiration(final RefreshTokenEntity token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new sign-in request");
        }

        return token;
    }

    @Transactional
    public int deleteByUsername(final String username) {
        final Optional<UserEntity> userEntity = userRepository.findByUsername(username);
        if (userEntity.isPresent()) {
            return refreshTokenRepository.deleteByUserId(userEntity.get().getId());
        }

        throw new TokenRefreshException(null, "User not found");
    }
}
