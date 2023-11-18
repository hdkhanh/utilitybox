package com.tech.auth.models.repostiories;

import java.util.Optional;

import com.tech.auth.models.entities.RefreshTokenEntity;
import com.tech.auth.models.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;


@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshTokenEntity, Long> {
    Optional<RefreshTokenEntity> findByToken(String token);

    @Modifying
    int deleteByUserId(Long userId);
}
