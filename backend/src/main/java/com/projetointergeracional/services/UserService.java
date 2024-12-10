package com.projetointergeracional.services;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetointergeracional.dtos.UserDTO;
import com.projetointergeracional.models.User;
import com.projetointergeracional.models.UserType;
import com.projetointergeracional.models.Activity;
import com.projetointergeracional.repositories.ActivityRepository;
import com.projetointergeracional.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ActivityRepository activityRepository;

    public UserDTO registerUser(UserDTO userDTO) {
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setBirthDate(userDTO.getBirthDate());
        user.setUsertype(userDTO.getUserType());
        user.setAddress(userDTO.getAddress());

        Set<Activity> activities = new HashSet<>();
        for (Long activityId : userDTO.getActivities()) {
            Activity activity = activityRepository.findById(activityId).orElseThrow(() -> new RuntimeException("Atividade não encontrada"));
            activities.add(activity);
        }
        user.setActivities(activities);

        User saveduser = userRepository.save(user);
        return convertToDTO(saveduser);
    }

    public UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPassword(user.getPassword());
        dto.setBirthDate(user.getBirthDate());
        dto.setUserType(user.getUsertype());
        dto.setAddress(user.getAddress());

        // Transformar atividades em IDs
        Set<Long> activityIds = new HashSet<>();
        for (Activity activity : user.getActivities()) {
            activityIds.add(activity.getId());
        }
        dto.setActivities(activityIds);

        return dto;
    }

    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public List<User> getUsersByType(UserType type) {
        return userRepository.findByUserType(type);
    }
}
