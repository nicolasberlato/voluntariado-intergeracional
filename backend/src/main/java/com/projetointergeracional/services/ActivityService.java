package com.projetointergeracional.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetointergeracional.models.Activity;
import com.projetointergeracional.repositories.ActivityRepository;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;


    public Activity addActivity(Activity activity){
        return activityRepository.save(activity);
    }
    
    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }
}

