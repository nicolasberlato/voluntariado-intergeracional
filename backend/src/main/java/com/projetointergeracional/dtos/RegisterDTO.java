package com.projetointergeracional.dtos;

import java.util.Set;

import com.projetointergeracional.models.Address;
import com.projetointergeracional.models.UserType;

public record RegisterDTO(String name, String email, String password, UserType type, Address address, Set<Long> activities) {

    public RegisterDTO {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Username cannot be null or empty");
        }
        if (password == null || password.isBlank()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        if (type == null) {
            throw new IllegalArgumentException("UserType cannot be null");
        }
    }
}