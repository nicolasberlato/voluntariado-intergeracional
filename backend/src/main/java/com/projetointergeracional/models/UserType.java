package com.projetointergeracional.models;

public enum UserType {
    VOLUNTEER("voluntario"),
    ELDERLY("usuario");

    private String type;

    UserType(String type){
        this.type = type;
    }

    public String getUserType(){
        return type;
    }
}
