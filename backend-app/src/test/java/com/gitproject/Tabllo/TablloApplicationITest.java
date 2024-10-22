package com.gitproject.Tabllo;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

//@Disabled("Disabled, using only UT")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TablloApplicationITest {

	@Autowired
	private TestRestTemplate template;

	@Test
	public void getIndexPage() throws Exception {
		ResponseEntity<String> response = template.getForEntity("/", String.class);
		assertThat(response.getBody()).isEqualTo("Welcome to Tabllo!");
	}

	@Test
	public void getBoardsPage() throws Exception {
		ResponseEntity<String> response = template.getForEntity("/boards", String.class);
		assertThat(response.getBody()).isEqualTo("Tabllo boards");
	}

}