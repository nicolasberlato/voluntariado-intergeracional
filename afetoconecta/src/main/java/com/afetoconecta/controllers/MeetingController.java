package com.afetoconecta.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.afetoconecta.dtos.MeetingDTO;
import com.afetoconecta.services.MeetingService;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/meetings")
public class MeetingController {

    @Autowired
    private MeetingService meetingService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/new")
    public ResponseEntity<MeetingDTO> scheduleMeeting(@RequestBody MeetingDTO request) {
        MeetingDTO meetingDTO = meetingService.scheduleMeetingDTO(
                request.user1Id(),
                request.user2Id(),
                request.scheduledDate(),
                request.description(),
                request.location(),
                request.type()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(meetingDTO);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/{meetingId}/confirm")
    public ResponseEntity<MeetingDTO> confirmMeeting(@PathVariable Long meetingId, @RequestParam Long userId) {
        MeetingDTO meetingDTO = meetingService.confirmMeeting(meetingId, userId);
        return ResponseEntity.ok(meetingDTO);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/{meetingId}/cancel")
    public ResponseEntity<Void> cancelMeeting(@PathVariable Long meetingId, @RequestParam Long userId) {
        meetingService.cancelMeeting(meetingId, userId);
        return ResponseEntity.noContent().build();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{meetingId}")
    public ResponseEntity<MeetingDTO> getMeetingById(@PathVariable Long meetingId) {
        MeetingDTO meetingDTO = meetingService.getMeetingById(meetingId);
        return ResponseEntity.ok(meetingDTO);
    }
    
}
