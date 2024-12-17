package com.afetoconecta.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.afetoconecta.dtos.AuthenticationDTO;
import com.afetoconecta.dtos.LoginResponseDTO;
import com.afetoconecta.dtos.RegisterDTO;
import com.afetoconecta.infra.TokenService;
import com.afetoconecta.models.Activity;
import com.afetoconecta.models.User;
import com.afetoconecta.repositories.ActivityRepository;
import com.afetoconecta.repositories.UserRepository;
import com.afetoconecta.services.UserService;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthenticationController {

    @Autowired
    private UserRepository repository;

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserService userService;
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthenticationDTO data) {
        var userNamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(userNamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());
        Long userId = ((User) auth.getPrincipal()).getId();
        User user = userService.getUserById(userId);
        
        return ResponseEntity.ok(new LoginResponseDTO(token, userId, user));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register (@RequestBody @Valid RegisterDTO data) {
        if(this.repository.findByEmail(data.email()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        Set<Activity> activities = new HashSet<>();

        if (data.activities() != null) {
            for (Long activityId : data.activities()) {
                Activity activity = activityRepository.findById(activityId)
                        .orElseThrow(() -> new RuntimeException("Activity not found with ID: " + activityId));
                activities.add(activity);
            }
        }

        User newUser = new User(
            data.name(),
            data.email(),
            encryptedPassword,
            data.userType(),
            data.address(),
            activities
        );
    
        this.repository.save(newUser);
        return ResponseEntity.ok().build();
    }
    
}
    
