package com.afetoconecta.dtos;

import com.afetoconecta.models.User;

public class LoginResponseDTO {
    private String token;
    private Long userId; 
    private User user;
    
    public LoginResponseDTO(String token, Long userId, User user) {
        this.token = token;
        this.userId = userId;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getUserId() {
        return userId;
    }


    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

}
