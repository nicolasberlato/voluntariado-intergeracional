package com.afetoconecta.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.afetoconecta.dtos.RegisterDTO;
import com.afetoconecta.models.User;
import com.afetoconecta.models.UserType;
import com.afetoconecta.services.UserService;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegisterDTO registerDTO) {
        User user = userService.registerUser(registerDTO);
    
        return ResponseEntity.ok(user);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/type/{type}")
    public List<User> getUsersByType(@PathVariable UserType type) {
        return userService.getUsersByType(type);
    }
    
}
