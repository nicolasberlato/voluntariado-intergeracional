package com.afetoconecta.controllers;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.afetoconecta.dtos.MeetingDTO;
import com.afetoconecta.dtos.RegisterDTO;
import com.afetoconecta.models.Meeting;
import com.afetoconecta.models.User;
import com.afetoconecta.models.UserType;
import com.afetoconecta.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/voluntario")
    public List<User> getVoluntarios(@RequestParam(required = false) String localidade, @RequestParam(required = false) List<String> atividades) {
        return userService.getUsersByFilters(UserType.VOLUNTARIO, localidade, atividades);
    }
    
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/usuario")
    public List<User> getUsuarios(@RequestParam(required = false) String localidade, @RequestParam(required = false) List<String> atividades) {
        return userService.getUsersByFilters(UserType.USUARIO, localidade, atividades);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{id}/history")
    public ResponseEntity<Set<Meeting>> getUserMeetingHistory(@PathVariable Long id) {
        Set<Meeting> meetings = userService.getUserMeetingHistory(id);
        return ResponseEntity.ok(meetings);
    }
}
