package com.afetoconecta.components;

import java.net.PasswordAuthentication;
import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.afetoconecta.infra.SecurityConfiguration;
import com.afetoconecta.models.Activity;
import com.afetoconecta.models.User;
import com.afetoconecta.models.UserType;
import com.afetoconecta.models.Address;
import com.afetoconecta.models.Meeting;
import com.afetoconecta.models.MeetingType;
import com.afetoconecta.repositories.ActivityRepository;
import com.afetoconecta.repositories.MeetingRepository;
import com.afetoconecta.repositories.UserRepository;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


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

        String encryptedPassword1 = passwordEncoder.encode("senha1");
        User user1 = userRepository.save(new User("Nícolas", "nicolas@email.com",encryptedPassword1, UserType.USUARIO,
        new Address("92022020","Rua Escócia","Lot. Moinhos de Vento","Marechal Rondon"
        ,"Canoas","Rio Grande do Sul","50"), Set.of(a1,a2,a3,a6,a7)));
        
        String encryptedPassword2 = passwordEncoder.encode("senha2");
        User user2 = userRepository.save(new User("Eduarda", "eduarda@email.com",encryptedPassword2, UserType.VOLUNTARIO,
        new Address("92340310","Rua Natal","","Mathias Velho"
        ,"Canoas","Rio Grande do Sul","2350"), Set.of(a1,a2,a3,a4,a5,a7)));
        
        String encryptedPassword3 = passwordEncoder.encode("senha3");
        User user3 = userRepository.save(new User("João", "joao@email.com",encryptedPassword3, UserType.USUARIO,
        new Address("20010040","Travessa Tocantins","","Centro"
        ,"Rio de Janeiro","Rio de Janeiro","980"), Set.of(a4,a5,a6,a7)));
        
        String encryptedPassword4 = passwordEncoder.encode("senha4");
        User user4 = userRepository.save(new User("Joana", "joana@email.com",encryptedPassword4, UserType.VOLUNTARIO,
        new Address("93226490","Rua Sancha de Tovar","","Capão da Cruz"
        ,"Sapucaia do Sul","Rio Grande do Sul","900"), Set.of(a1,a2,a6)));
        
        String encryptedPassword5 = passwordEncoder.encode("senha5");
        User user5 = userRepository.save(new User("Paulo", "paulo@email.com",encryptedPassword5, UserType.USUARIO,
        new Address("01153010","Rua Doutor Sérgio Meira","","Barra Funda"
        ,"São Paulo","São Paulo","100"), Set.of(a1,a2,a3,a4,a5,a6,a7)));
        
        String encryptedPassword6 = passwordEncoder.encode("senha6");
        User user6 = userRepository.save(new User("Maria", "maria@email.com",encryptedPassword6, UserType.VOLUNTARIO,
        new Address("92010020","Rua André da Rocha","","Centro"
        ,"Canoas","Rio Grande do Sul","120"), Set.of(a3,a4,a5,a6,a7)));
        
        meetingRepository.save(new Meeting(user1, user2, LocalDateTime.of(2024,12,20,10,30), 
        "Capão do Corvo", "Passeio para ver os animais do zoológico", MeetingType.PRESENCIAL));
        
        meetingRepository.save(new Meeting(user4, user5, LocalDateTime.of(2024,12,23,14,30), "Rua Doutor Sérgio Meira 100", 
        "Ajuda com o computador", MeetingType.PRESENCIAL));
        
        meetingRepository.save(new Meeting(user3, user4, LocalDateTime.of(2024,12,28,9,30),"", 
        "Conversa online", MeetingType.VIRTUAL));
        
        meetingRepository.save(new Meeting(user6, user1, LocalDateTime.of(2024,12,22,10,30),"A combinar", 
        "Sessão de leitura", MeetingType.PRESENCIAL));
    }

}
