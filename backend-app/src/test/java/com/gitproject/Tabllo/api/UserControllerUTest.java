package com.gitproject.Tabllo.api;

import com.gitproject.Tabllo.repository.UserRepository;
import com.gitproject.Tabllo.repository.model.User;
import com.gitproject.Tabllo.service.UserService;
import org.assertj.core.api.Assert;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class UserControllerUTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    public void testGetUserByUsername()
    {
        String username = "Joe";
        User user = new User();
        user.setUsername(username);
        Mockito.when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));

        Optional<User> result = userService.getUser(username);

        Assertions.assertThat(result.isPresent());
        Assertions.assertThat(result.get().getUsername()).isEqualTo(username);

    }
}
