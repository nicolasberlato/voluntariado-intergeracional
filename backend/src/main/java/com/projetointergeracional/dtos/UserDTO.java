package com.projetointergeracional.dtos;

import java.time.LocalDate;
import java.util.Set;

import com.projetointergeracional.models.Address;
import com.projetointergeracional.models.UserType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
public class UserDTO {

    private String name;
    private String email;
    private String password;
    private LocalDate birthDate;
    private UserType userType;
    private Address address;
    private Set<Long> activities;

    
    
}
