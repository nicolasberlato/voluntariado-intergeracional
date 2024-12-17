package com.afetoconecta.dtos;

import java.util.Set;

import com.afetoconecta.models.Address;

public record UpdateDTO(String name, String email, Address address, Set<Long> activities) {

}
