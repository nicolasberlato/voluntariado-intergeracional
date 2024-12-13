package com.afetoconecta.models;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "meetings")
@Data
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user1_id", nullable = false)
    private User user1;
    
    @ManyToOne
    @JoinColumn(name = "user2_id", nullable = false)
    private User user2;

    private LocalDateTime scheduledDate;
    @Enumerated(EnumType.STRING)
    private MeetingType meetingType;
    @Enumerated(EnumType.STRING)
    private MeetingStatus meetingStatus;

    private Boolean user1Confirmed;
    private Boolean user2Confirmed;

    private String location;
    private String description;


    public Meeting(User user1, User user2, LocalDateTime scheduledDate, String location, String description, MeetingType meetingType){
        this.user1 = user1;
        this.user2 = user2;
        this.scheduledDate = scheduledDate;
        this.location = location;
        this.description = description;
        this.meetingType = meetingType;
        this.meetingStatus = MeetingStatus.PENDENTE;
        this.user1Confirmed = true;
        this.user2Confirmed = false;
    }
}
