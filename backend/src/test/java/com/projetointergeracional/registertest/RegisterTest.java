package com.projetointergeracional.registertest;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class RegisterTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testCadastrarUsuario() throws Exception {
        String usuarioJson = "{\n" +
                "\"name\": \"João\",\n" +
                "\"email\": \"joao@example.com\",\n" +
                "\"password\": \"senha123\",\n" +
                "\"birthDate\": \"1995-06-15\",\n" +
                "\"userType\": \"JOVEM\",\n" +
                "\"endereco\": {\n" +
                "\"cep\": \"12345-678\",\n" +
                "\"logradouro\": \"Rua das Flores\",\n" +
                "\"complemento\": \"Apt 101\",\n" +
                "\"bairro\": \"Centro\",\n" +
                "\"localidade\": \"São Paulo\",\n" +
                "\"estado\": \"SP\",\n" +
                "\"numero\": \"10\"\n" +
                "},\n" +
                "\"activities\": [1, 2] \n" +
                "}";

        mockMvc.perform(post("/register/newuser")
                .contentType("application/json")
                .content(usuarioJson))
                .andExpect(status().isOk());
    }
}
