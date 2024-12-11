package com.projetointergeracional.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetointergeracional.models.User;
import com.projetointergeracional.models.UserType;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository <User, Long> {

    List<User> findByUserType(UserType userType);
    Optional <User> findByEmail(String email);
}
