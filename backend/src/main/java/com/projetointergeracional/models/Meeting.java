package com.projetointergeracional.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "meetings")
@Getter
@Setter
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private User volunteer;
    private User elderly;
    private LocalDateTime date;
    private String description;
    private MeetingType meetingType;
    private Boolean volunteerConfirmed;
    private Boolean elderlyConfirmed;
    private Boolean isCompleted;

}
