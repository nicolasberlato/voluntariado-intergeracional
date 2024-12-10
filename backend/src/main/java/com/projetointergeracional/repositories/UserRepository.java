package com.projetointergeracional.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetointergeracional.models.User;
import com.projetointergeracional.models.UserType;

import java.util.List;


public interface UserRepository extends JpaRepository <User, Long> {

    List<User> findByUserType(UserType usertype);
}
