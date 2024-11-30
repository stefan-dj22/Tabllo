package com.gitproject.Tabllo.api;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import javax.print.attribute.standard.Media;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerITest {
    @Autowired
    private MockMvc mvc;

    @Test
    public void createUser() throws Exception {

    }

    @Test
    public void createRetriveUser() throws Exception{
        String json = """
                {
                    "Username" : "joe",
                    "Password" : "secure"
                }
                """;
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated());

        mvc.perform(MockMvcRequestBuilders
                .get("/api/v1/users/{username}","joe")
                .content("application/json"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"));
    }

}
