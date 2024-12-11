package com.projetointergeracional.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetointergeracional.dtos.RegisterDTO;
import com.projetointergeracional.models.User;
import com.projetointergeracional.services.UserService;

@RestController
@RequestMapping("/register")
public class RegisterController {

    @Autowired
    UserService userService;

    @PostMapping
    public ResponseEntity<User> registerUser(@RequestBody RegisterDTO userDTO) {
        User user = userService.registerUser(userDTO);
        return ResponseEntity.ok(user);
    }
}
