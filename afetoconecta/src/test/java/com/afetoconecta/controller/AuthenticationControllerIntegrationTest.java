package com.afetoconecta.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.afetoconecta.dtos.AuthenticationDTO;
import com.afetoconecta.dtos.RegisterDTO;
import com.afetoconecta.models.Address;
import com.afetoconecta.models.User;
import com.afetoconecta.models.UserType;
import com.afetoconecta.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Set;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthenticationControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    private ObjectMapper objectMapper = new ObjectMapper();

    private AuthenticationDTO authenticationDTO;
    private RegisterDTO registerDTO;

    @BeforeEach
    public void setUp() {
        userRepository.deleteAll();

        authenticationDTO = new AuthenticationDTO("test@afetoconecta.com", "password");
        registerDTO = new RegisterDTO("Test User", "test@afetoconecta.com", "password", UserType.USUARIO, 
        new Address("","Rua A","","","São Paulo", "São Paulo",""), Set.of(1L,2L));
    }

    @Test
    public void testLogin_ValidUser() throws Exception {
    
        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerDTO)))
                .andExpect(status().isOk());
        
        // Realiza o login com dados válidos
        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authenticationDTO)))
                .andExpect(status().isOk());        
    }

    @Test
    public void testLogin_InvalidUser() throws Exception {
        AuthenticationDTO invalidLoginDTO = new AuthenticationDTO("invalid@afetoconecta.com", "wrongPassword");

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidLoginDTO)))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testRegister_ValidUser() throws Exception {
        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerDTO)))
                .andExpect(status().isOk());

        User savedUser = (User) userRepository.findByEmail(registerDTO.email());
        assert savedUser != null;
        assert savedUser.getEmail().equals(registerDTO.email());
    }

    @Test
    public void testRegister_EmailAlreadyExists() throws Exception {
        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerDTO)))
                .andExpect(status().isOk());

        RegisterDTO invalidRegisterDTO = new RegisterDTO("Test User 2", "test@afetoconecta.com", "password", UserType.USUARIO, 
        new Address("","Rua A","","","São Paulo", "São Paulo",""), Set.of(1L,2L));

        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRegisterDTO)))
                .andExpect(status().isBadRequest());
    }
}
