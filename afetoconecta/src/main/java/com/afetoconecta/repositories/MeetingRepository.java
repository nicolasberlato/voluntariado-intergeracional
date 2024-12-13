package com.afetoconecta.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.afetoconecta.models.Meeting;
import com.afetoconecta.models.MeetingStatus;
import com.afetoconecta.models.User;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {

    List<Meeting> findByUser2AndStatus(User user2, MeetingStatus status);
}
