package com.projetointergeracional.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetointergeracional.models.Activity;
import com.projetointergeracional.repositories.ActivityRepository;

import jakarta.annotation.PostConstruct;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    @PostConstruct
    public void init() {
        // Verifica se o banco de dados já contém atividades predefinidas
        if (activityRepository.count() == 0) {
            Activity atividade1 = new Activity();
            
            atividade1.setDescription("Leitura");

            Activity atividade2 = new Activity();
            
            atividade2.setDescription("Ajuda com tecnologia");

            Activity atividade3 = new Activity();
            
            atividade3.setDescription("Atividade física");

            activityRepository.save(atividade1);
            activityRepository.save(atividade2);
            activityRepository.save(atividade3);

            System.out.println("Atividades predefinidas adicionadas ao banco de dados.");
        }
    }
}

