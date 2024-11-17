package com.gitproject.Tabllo.api;

import com.gitproject.Tabllo.api.model.UserCreationRequest;
import com.gitproject.Tabllo.repository.model.User;
import com.gitproject.Tabllo.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable long id)
    {
        return userService.getUser(id);
    }

    @PostMapping
    public User createUser(@RequestBody UserCreationRequest userCreationRequest)
    {
        return userService.createUser(userCreationRequest);
    }
}
