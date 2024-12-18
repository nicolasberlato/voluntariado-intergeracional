package com.afetoconecta.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.afetoconecta.dtos.MeetingDTO;
import com.afetoconecta.models.Meeting;
import com.afetoconecta.models.MeetingStatus;
import com.afetoconecta.models.MeetingType;
import com.afetoconecta.models.User;
import com.afetoconecta.repositories.MeetingRepository;
import com.afetoconecta.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private UserRepository userRepository;

    public Meeting scheduleMeeting(Long user1Id, Long user2Id, LocalDateTime scheduledDate, String description, String location, MeetingType meetingType) {
        User user1 = userRepository.findById(user1Id).orElseThrow(() -> new EntityNotFoundException("Usuário requerente não encontrado."));
        User user2 = userRepository.findById(user2Id).orElseThrow(() -> new EntityNotFoundException("Usuário requerido não encontrado."));

        Meeting meeting = new Meeting();
        meeting.setUser1(user1);
        meeting.setUser2(user2);
        meeting.setScheduledDate(scheduledDate);
        meeting.setDescription(description);
        meeting.setLocation(location);
        meeting.setType(meetingType);
        meeting.setStatus(MeetingStatus.PENDENTE);
        meeting.setUser1Confirmed(true);
        meeting.setUser2Confirmed(false);

        return meetingRepository.save(meeting); // Salva a entidade no banco
    }

    public MeetingDTO scheduleMeetingDTO(Long user1Id, Long user2Id, LocalDateTime scheduledDate, String description, String location, MeetingType meetingType) {
        Meeting meeting = scheduleMeeting(user1Id, user2Id, scheduledDate, description, location, meetingType);
        return convertToDTO(meeting); // Converte para DTO para enviar na resposta
    }

    private MeetingDTO convertToDTO(Meeting meeting) {
        return new MeetingDTO(
            meeting.getUser1().getId(),
            meeting.getUser2().getId(),
            meeting.getScheduledDate(),
            meeting.getDescription(),
            meeting.getLocation(),
            meeting.getType()
        );
    }

    public MeetingDTO confirmMeeting(Long meetingId, Long userId) {
        Meeting meeting = meetingRepository.findById(meetingId).orElseThrow(() -> new EntityNotFoundException("O encontro em questão não foi encontrado."));

        if (meeting.getUser2().getId().equals(userId)) {
            meeting.setUser2Confirmed(true);
            if (meeting.isUser1Confirmed() && meeting.isUser2Confirmed()) {
                meeting.setStatus(MeetingStatus.CONFIRMADO);
            }
        } else {
            throw new IllegalArgumentException("Apenas o convidado pode aceitar esse encontro.");
        }
        meeting = meetingRepository.save(meeting);
        return convertToDTO(meeting);
    }

    public void cancelMeeting(Long meetingId, Long userId) {
        Meeting meeting = meetingRepository.findById(meetingId).orElseThrow(() -> new EntityNotFoundException("O encontro em questão não foi encontrado."));

        if (meeting.getUser1().getId().equals(userId) || meeting.getUser2().getId().equals(userId)) {
            meeting.setStatus(MeetingStatus.CANCELADO);
            meetingRepository.save(meeting);
        } else {
            throw new IllegalArgumentException("Apenas as partes envolvidas podem cancelar o encontro.");
        }
    }

    public MeetingDTO getMeetingById(Long meetingId) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new EntityNotFoundException("O encontro em questão não foi encontrado."));
        return convertToDTO(meeting);
    }
}

