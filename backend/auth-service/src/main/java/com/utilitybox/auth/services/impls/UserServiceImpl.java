package com.utilitybox.auth.services.impls;

import com.utilitybox.auth.models.entities.UserEntity;
import com.utilitybox.auth.models.exceptions.NotFoundException;
import com.utilitybox.auth.models.repostiories.UserRepository;
import com.utilitybox.auth.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public UserEntity findUserByUsername(String username) {
        final Optional<UserEntity> byUsername = this.userRepository.findByUsername(username);
        if (byUsername.isPresent()) {
            return byUsername.get();
        } else {
            throw new NotFoundException("Can not find user with this username");
        }
    }

    @Override
    public UserEntity findUserById(Long id) {
        final Optional<UserEntity> byId = this.userRepository.findById(id);
        if (byId.isPresent()) {
            return byId.get();
        } else {
            throw new NotFoundException("Can not find user with this id");
        }
    }
}
