package com.utilitybox.auth.services;

import com.utilitybox.auth.models.entities.UserEntity;

public interface UserService {
    UserEntity findUserByUsername(String username);

    UserEntity findUserById(Long id);
}


