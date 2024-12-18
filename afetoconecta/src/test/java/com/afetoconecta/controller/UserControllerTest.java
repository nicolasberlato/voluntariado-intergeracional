package com.afetoconecta.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.afetoconecta.controllers.UserController;
import com.afetoconecta.dtos.UpdateDTO;
import com.afetoconecta.models.Address;
import com.afetoconecta.models.Meeting;
import com.afetoconecta.models.User;
import com.afetoconecta.models.UserType;
import com.afetoconecta.services.UserService;

public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetUser() {
        User user = new User();
        user.setId(1L);
        when(userService.getUserById(1L)).thenReturn(user);

        ResponseEntity<User> response = userController.getUser(1L);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(user, response.getBody());
    }

    @Test
    public void testGetVoluntariosWithFilters() {
        User user1 = new User();
        User user2 = new User();
        List<User> users = Arrays.asList(user1, user2);
        String localidade = "São Paulo";
        List<String> atividades = Arrays.asList("Ensinar", "Ajudar");
        when(userService.getUsersByFilters(UserType.VOLUNTARIO, localidade, atividades)).thenReturn(users);

        List<User> response = userController.getVoluntarios(localidade, atividades);

        assertEquals(users, response);
    }

    @Test
    public void testGetUsuariosWithFilters() {
        User user1 = new User();
        User user2 = new User();
        List<User> users = Arrays.asList(user1, user2);
        String localidade = "Rio de Janeiro";
        List<String> atividades = Arrays.asList("Cuidar", "Apoiar");
        when(userService.getUsersByFilters(UserType.USUARIO, localidade, atividades)).thenReturn(users);

        List<User> response = userController.getUsuarios(localidade, atividades);

        assertEquals(users, response);
    }

    @Test
    public void testGetUserMeetingHistory() {
        Set<Meeting> meetings = new HashSet<>();
        Meeting meeting1 = new Meeting();
        meetings.add(meeting1);
        when(userService.getUserMeetingHistory(1L)).thenReturn(meetings);

        ResponseEntity<Set<Meeting>> response = userController.getUserMeetingHistory(1L);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(meetings, response.getBody());
    }

    @Test
    public void testUpdateUserProfile() {
        Set<Long> activityIds = new HashSet<>();
        activityIds.add(1L);
        activityIds.add(2L);

        UpdateDTO updateDTO = new UpdateDTO("João", "joao@example.com", 
        new Address("","Rua A","","","São Paulo", "São Paulo",""), activityIds);

        String username = "test@example.com";
        SecurityContextHolder.getContext().setAuthentication(mock(Authentication.class));
        when(SecurityContextHolder.getContext().getAuthentication().getName()).thenReturn(username);

        doNothing().when(userService).updateUser(username, updateDTO);

        ResponseEntity<?> response = userController.updateUserProfile(updateDTO);

        assertEquals(200, response.getStatusCode().value());
        assertEquals("Perfil atualizado com sucesso!", response.getBody());
    }
}

