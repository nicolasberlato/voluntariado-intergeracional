package com.afetoconecta.dtos;

import java.time.LocalDateTime;

import com.afetoconecta.models.MeetingType;

public record MeetingDTO(Long user1Id, Long user2Id, LocalDateTime scheduledDate, String description, String location, MeetingType type) {

}
