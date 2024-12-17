package com.afetoconecta.services;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.afetoconecta.dtos.RegisterDTO;
import com.afetoconecta.dtos.UpdateDTO;
import com.afetoconecta.models.Activity;
import com.afetoconecta.models.Meeting;
import com.afetoconecta.models.User;
import com.afetoconecta.models.UserType;
import com.afetoconecta.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

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

    public List<User> getUsersByTypeAndLocalidade(UserType userType, String localidade) {
        return userRepository.findByUserTypeAndAddress_Localidade(userType, localidade);
    }

    public List<User> getUsersByFilters(UserType userType, String localidade, List<String> atividades) {
        return userRepository.findByUserTypeAndAddress_LocalidadeAndActivities_DescriptionIn(
            userType, 
            localidade != null && !localidade.isEmpty() ? localidade : null, 
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

    @Transactional
    public void updateUser(String email, UpdateDTO update){
        User user = (User) userRepository.findByEmail(email);

        if (update.name() != null) {
            user.setName(update.name());
        }
        if (update.email() != null) {
            user.setEmail(update.email());
        }
        if (update.address() != null) {
            user.setAddress(update.address());
        }

        if (update.activities() != null) {
            Set<Activity> activities = new HashSet<>(
                activityRepository.findAllById(update.activities())
            );
            user.setActivities(activities);
        }

        userRepository.save(user);
    }
    

}
