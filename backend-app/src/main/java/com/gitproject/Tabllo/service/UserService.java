package com.gitproject.Tabllo.service;

import com.gitproject.Tabllo.api.model.UserCreationRequest;
import com.gitproject.Tabllo.repository.UserRepository;
import com.gitproject.Tabllo.repository.model.User;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(UserCreationRequest request)
    {
        User user = new User();
        user.setUsername(request.Username());
        user.setPassword(request.Password());
        return userRepository.save(user);
    }

    public Optional<User> getUser(final String username)
    {
        return userRepository.findByUsername(username);
    }
    @Transactional
    public boolean deleteUserByUsername(final String username)
    {
        if(userRepository.existsByUsername(username))
        {
            userRepository.deleteByUsername((username));
            return true;
        }
        return false;
    }

}
