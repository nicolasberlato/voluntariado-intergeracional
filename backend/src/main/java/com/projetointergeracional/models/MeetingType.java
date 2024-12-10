package com.projetointergeracional.models;

public enum MeetingType {
    VIRTUAL("virtual"),
    INPERSON("presencial");

    private String type;

    MeetingType(String type){
        this.type = type;
    }

    public String getMeetingType(){
        return type;
    }
}
