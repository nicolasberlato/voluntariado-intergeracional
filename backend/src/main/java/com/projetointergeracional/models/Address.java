package com.projetointergeracional.models;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class Address {

    private String cep;
    private String lograodouro;
    private String complemento;
    private String bairro;
    private String localidade;
    private String estado;
    private int numero;
    
}
