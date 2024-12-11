package com.projetointergeracional.services;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.projetointergeracional.dtos.RegisterDTO;
import com.projetointergeracional.models.Activity;
import com.projetointergeracional.models.User;
import com.projetointergeracional.models.UserType;
import com.projetointergeracional.repositories.ActivityRepository;
import com.projetointergeracional.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ActivityRepository activityRepository;

    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public List<User> getUsersByType(@PathVariable ("type")UserType type) {
        return userRepository.findByUserType(type);
    }

    public User registerUser(RegisterDTO userDTO) {
        Set<Activity> activities = new HashSet<>();

        if (userDTO.activities() != null) {
            for (Long activityId : userDTO.activities()) {
                Activity activity = activityRepository.findById(activityId)
                        .orElseThrow(() -> new RuntimeException("Activity not found with ID: " + activityId));
                activities.add(activity);
            }
        }

        User user = new User(
            userDTO.name(),
            userDTO.email(),
            userDTO.password(),
            userDTO.type(),
            userDTO.address(),
            activities
        );
        
        return userRepository.save(user);

    }
        
}
