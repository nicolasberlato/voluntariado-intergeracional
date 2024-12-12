package com.afetoconecta.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.afetoconecta.models.Activity;
import java.util.Optional;


@Repository
public interface ActivityRepository extends JpaRepository <Activity, Long> {

    Optional<Activity> findById(Long id);
    Optional<Activity> findByDescription(String description);
}
