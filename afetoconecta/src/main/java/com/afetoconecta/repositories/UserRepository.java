package com.afetoconecta.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.afetoconecta.models.User;
import com.afetoconecta.models.UserType;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository <User, Long> {
    List<User> findByUserType(UserType userType);
    UserDetails findByEmail(String email);
    List <User> findByUserTypeAndAddress_Localidade(UserType userType, String localidade);
    @Query("SELECT u FROM User u " +
       "JOIN u.activities a " +
       "WHERE u.userType = :userType " +
       "AND (:localidade IS NULL OR u.address.localidade = :localidade) " +
       "AND (:atividades IS NULL OR a.description IN :atividades)")
    List<User> findByUserTypeAndAddress_LocalidadeAndActivities_DescriptionIn(
        @Param("userType") UserType userType, 
        @Param("localidade") String localidade,
        @Param("atividades") List<String> atividades);
}

