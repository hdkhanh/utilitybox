package com.tech.auth.services;

import com.tech.auth.models.entities.UserEntity;
import org.springframework.stereotype.Service;

public interface UserService {
    UserEntity findUserByUsername(String username);
    UserEntity findUserById(Long id);
}


