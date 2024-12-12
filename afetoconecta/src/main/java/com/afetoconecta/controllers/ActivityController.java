package com.afetoconecta.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.afetoconecta.models.Activity;
import com.afetoconecta.services.ActivityService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("activities")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @GetMapping
    public ResponseEntity<List<Activity>> getAll() {
        return ResponseEntity.ok(activityService.getAllActivities());
    }

    @PostMapping("/new")
    public ResponseEntity<Activity> createActivity (@RequestBody Activity activity){
        Activity savedActivity = activityService.addActivity(activity);
        return ResponseEntity.ok(savedActivity);
    }
    
    
}
