package com.gitproject.Tabllo.api;

import com.gitproject.Tabllo.api.model.UserCreationRequest;
import com.gitproject.Tabllo.repository.model.User;
import com.gitproject.Tabllo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{username}")
    public Optional<User> getUser(@PathVariable String username )
    {
        return userService.getUser(username);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserCreationRequest userCreationRequest)
    {
        User user = userService.createUser(userCreationRequest);
        if( user ==null) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(user,HttpStatus.CREATED);
    }
    @DeleteMapping("/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        boolean isDeleted = userService.deleteUserByUsername(username);

        if (isDeleted) {
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

}
