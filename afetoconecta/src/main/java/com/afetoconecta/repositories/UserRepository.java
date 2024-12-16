package com.afetoconecta.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.afetoconecta.models.User;
import com.afetoconecta.models.UserType;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository <User, Long> {
    List<User> findByUserType(UserType userType);
    UserDetails findByEmail(String email);
    List <User> findByUserTypeAndAddress_LocalidadeAndActivities_DescriptionIn(UserType userType, String localidade, List<String> atividades);
}

