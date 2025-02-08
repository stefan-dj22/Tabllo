package com.gitproject.Tabllo.api;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import javax.print.attribute.standard.Media;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Disabled("No need to be run automatically; Requires external connection")
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerITest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private PlatformTransactionManager transactionManager;

    private TransactionStatus transactionStatus;

    @BeforeEach
    public void beginTransaction() {
        transactionStatus = transactionManager.getTransaction(new DefaultTransactionDefinition());
    }

    @AfterEach
    public void rollbackTransaction() {
        if (transactionStatus != null && !transactionStatus.isCompleted()) {
            transactionManager.rollback(transactionStatus);
        }
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
        String username = "joe";

        mvc.perform(MockMvcRequestBuilders
                        .delete("/api/v1/users/{username}", username))
                .andExpect(status().isOk());
    }

}
