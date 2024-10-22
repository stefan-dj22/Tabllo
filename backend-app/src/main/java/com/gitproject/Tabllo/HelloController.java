package com.gitproject.Tabllo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("/")
    public String index() {
        return "Welcome to Tabllo!";
    }

    @GetMapping("/boards")
    public String boards() {
        return "Tabllo boards";
    }
}
