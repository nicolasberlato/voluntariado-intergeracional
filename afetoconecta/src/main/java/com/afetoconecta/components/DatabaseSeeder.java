package com.afetoconecta.components;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.afetoconecta.models.Activity;
import com.afetoconecta.models.User;
import com.afetoconecta.models.UserType;
import com.afetoconecta.models.Address;
import com.afetoconecta.repositories.ActivityRepository;
import com.afetoconecta.repositories.UserRepository;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ActivityRepository activityRepository;


    @Override
    public void run(String... args) throws Exception {
        // TODO Auto-generated method stub
        Activity a1 = activityRepository.save(new Activity("Tarefas domésticas"));
        Activity a2 = activityRepository.save(new Activity("Ajuda com tecnologia"));
        Activity a3 = activityRepository.save(new Activity("Leitura"));
        Activity a4 = activityRepository.save(new Activity("Atividades ao ar livre"));
        Activity a5 = activityRepository.save(new Activity("Companhia"));
        Activity a6 = activityRepository.save(new Activity("Conversar"));
        Activity a7 = activityRepository.save(new Activity("Atividades físicas"));

        userRepository.save(new User("Nícolas", "nicolas@email.com","senha123", UserType.USUARIO,
        new Address("92022020","Rua Escócia","Lot. Moinhos de Vento","Marechal Rondon"
        ,"Canoas","Rio Grande do Sul","50"), Set.of(a1,a2,a6,a7)));
        
        userRepository.save(new User("Eduarda", "eduarda@email.com","senha789", UserType.VOLUNTARIO,
        new Address("92340310","Rua Natal","","Mathias Velho"
        ,"Canoas","Rio Grande do Sul","2350"), Set.of(a1,a2,a3,a4,a5,a7)));
        
    }

}
