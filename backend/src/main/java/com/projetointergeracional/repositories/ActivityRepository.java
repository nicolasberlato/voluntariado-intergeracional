package com.projetointergeracional.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetointergeracional.models.Activity;
import java.util.Optional;


public interface ActivityRepository extends JpaRepository<Activity, Long>{

    Optional<Activity> findById(Long id);
}
