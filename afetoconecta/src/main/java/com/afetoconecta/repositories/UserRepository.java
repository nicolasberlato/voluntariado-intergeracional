package com.afetoconecta.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.afetoconecta.models.User;
import com.afetoconecta.models.UserType;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository <User, Long> {
    List<User> findByUserType(UserType userType);
    Optional<User> findByEmail(String email);
    List <User> findByUserTypeAndAddress_Localidade(UserType userType, String localidade);
}

