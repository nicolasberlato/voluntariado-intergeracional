package com.afetoconecta.services;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.afetoconecta.dtos.RegisterDTO;
import com.afetoconecta.models.Activity;
import com.afetoconecta.models.Meeting;
import com.afetoconecta.models.User;
import com.afetoconecta.models.UserType;
import com.afetoconecta.repositories.ActivityRepository;
import com.afetoconecta.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ActivityRepository activityRepository;

    /*
     * public User registerUser(User user) {
     * if (userRepository.findByEmail(user.getEmail()).isPresent()) {
     * throw new RuntimeException("Email already registered");
     * }
     * return userRepository.save(user);
     * }
     */

    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public List<User> getUsersByType(@PathVariable UserType type) {
        return userRepository.findByUserType(type);
    }

    public List<User> getUsersByFilters(UserType userType, String localidade, List<String> atividades) {
        return userRepository.findByUserTypeAndAddress_LocalidadeAndActivities_DescriptionIn(userType, 
        localidade != null && !localidade.isBlank() ? localidade : null, 
        atividades != null && !atividades.isEmpty() ? atividades : null);
    }

    public Set<Meeting> getUserMeetingHistory(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Set<Meeting> allMeetings = new HashSet<>();
        allMeetings.addAll(user.getInitiatedMeetings());
        allMeetings.addAll(user.getReceivedMeetings());
        return allMeetings;
    }
    

}
