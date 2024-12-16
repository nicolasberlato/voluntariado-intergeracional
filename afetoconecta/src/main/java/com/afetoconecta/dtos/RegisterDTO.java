package com.afetoconecta.dtos;

import java.util.Set;

import com.afetoconecta.models.Address;
import com.afetoconecta.models.UserType;

public record RegisterDTO(String name, String email, String password, UserType userType, Address address, Set<Long> activities) {
    
}

